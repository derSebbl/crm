import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { collection, doc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {

  }
  firestore: Firestore = inject(Firestore);

  loading = false;
  birthDate!: Date;
  userID:string = '';
  user: User = {
    street: '',
    zipCode: 0,
    city: '',
    firstName: '',
    lastName: '',
    email: '',
    pet: '',
    petInfo: false,
    bills: 0,
    toJSON: function (): { firstName: string; lastName: string; email: string; street: string; zipCode: number; city: string;pet: string; petInfo: boolean; bills: number;} {
      throw new Error('Function not implemented.');
    }
  };

  saveChanges(){
    this.loading = true;
    updateDoc(doc(collection(this.firestore, 'users'), this.userID), this.user.toJSON()).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
