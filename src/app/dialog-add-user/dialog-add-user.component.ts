import { Component, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {

   }

  user= new User();
  loading = false;

  saveUser() {
    let acollection = collection(this.firestore, 'users');
    this.loading = true;
    addDoc(acollection, this.user.toJSON()).then((docRef) => {
      this.loading = false;
      this.dialogRef.close();
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
}


}