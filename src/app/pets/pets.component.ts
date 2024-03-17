import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, collectionData, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { DialogAddPetcareComponent } from '../dialog-add-petcare/dialog-add-petcare.component';


@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss'
})
export class PetsComponent {
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

  updateBill(userId: string, amount: number) {
    const userRef = doc(this.firestore, 'users', userId);
    getDoc(userRef).then((userDoc) => {
      if (userDoc.exists()) {
        const userData = userDoc.data();
        let currentBill = userData?.['bill'] || 0; 
        currentBill = parseInt(currentBill); 
        updateDoc(userRef, {
          bill: currentBill + amount 
        });
      }
    });
  }

  togglePetInfo(userId: string) {
    const userRef = doc(this.firestore, 'users', userId);
    getDoc(userRef).then((userDoc) => {
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const currentPetInfo = userData?.['petInfo'];
        if (!currentPetInfo) {
          updateDoc(userRef, {
            petInfo: !currentPetInfo
          });
          this.updateBill(userId, 200); 
        } else {
          updateDoc(userRef, {
            petInfo: !currentPetInfo
          });
        }
      }
    });
  } 

  openDialog() {
    this.dialog.open(DialogAddPetcareComponent);
  }
}
