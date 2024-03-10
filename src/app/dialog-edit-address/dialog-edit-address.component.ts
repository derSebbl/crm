import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { ChangeDetectorRef } from '@angular/core';

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
    birthDate: 0,
    petInfo: false,
    toJSON: function (): { firstName: string; lastName: string; email: string; birthDate: number; street: string; zipCode: number; city: string; petInfo: boolean; } {
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
