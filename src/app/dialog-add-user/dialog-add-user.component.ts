import { Component, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  
  firestore: Firestore = inject(Firestore);

  constructor() {

   }

  user= new User();
  birthDate!: Date;

  saveUser() {
    let acollection = collection(this.firestore, 'users');
    this.user.birthDate = this.birthDate?.getTime() ?? 0;
    console.log(this.user);

    addDoc(acollection, this.user.toJSON()).then((docRef) => {
      console.log("user added with ID: ", docRef.id);
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
}
}