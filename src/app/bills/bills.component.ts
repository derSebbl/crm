import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, collectionData, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.scss'
})
export class BillsComponent {

  firestore: Firestore = inject(Firestore);
  users$!: Observable<any[]>;
  user: any;


  constructor(public dialog: MatDialog) {
    const aCollection = collection(this.firestore, 'users')
    this.users$ = collectionData(aCollection);
    this.users$ = collectionData(aCollection, {idField: 'id'});
   }

  ngOnInit(): void{
  }
  
  async payBill(userID: string){
    const userRef = doc(this.firestore, 'users', userID);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const currentBill = userSnap.data()['bill'];
      await updateDoc(userRef, { bill: 0 });
      const salesVolumeRef = collection(this.firestore, 'salesVolume');
      const salesVolumeDoc = doc(salesVolumeRef, new Date().toISOString());
      await setDoc(salesVolumeDoc, { amount: currentBill, date: new Date().toISOString() });
    } else {
      console.error(`User with ID ${userID} does not exist.`);
    }
  }
}
