import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { collection, doc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {

  }
  

  firestore: Firestore = inject(Firestore);

  loading = false;
  userID:string = '';
  user: User = {
    street: '',
    zipCode: 0,
    city: '',
    firstName: '',
    lastName: '',
    email: '',
    pet: '',
    petName: '',
    petAllergens: '',
    petInfo: false,
    careDays: 0,
    bills: 0,
    toJSON: function (): { firstName: string; lastName: string; email: string; street: string; zipCode: number; city: string; pet: string; petInfo: boolean; bills: number; petName: string; petAllergens: string; careDays: number;} {
      throw new Error('Function not implemented.');
    }
  };

  saveChanges(){
    this.loading = true;
    updateDoc(doc(collection(this.firestore, 'users'), this.userID), this.user.toJSON()).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
  };
}
