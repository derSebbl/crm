import { Component } from '@angular/core';
import { User } from '../../models/user.class';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  

  constructor(private firestore: Firestore) { }

  user= new User();
  birthDate!: Date;

  saveUser() {
    this.user.birthDate = this.birthDate?.getTime() ?? 0;
    console.log(this.user);
}
}