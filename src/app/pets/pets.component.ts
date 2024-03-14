import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class'
import { Firestore, collectionData, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';


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

  togglePetInfo(userId: string) {
    const userRef = doc(this.firestore, 'users', userId);
    getDoc(userRef).then((userDoc) => {
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const currentPetInfo = userData?.['petInfo'];
        updateDoc(userRef, {
          petInfo: !currentPetInfo
        });
      }
    });
  }
}
