import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {

  firestore: Firestore = inject(Firestore);

  loading = false;
  user: User = {
    street: '',
    zipCode: 0,
    city: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: 0,
    toJSON: function (): { firstName: string; lastName: string; email: string; birthDate: number; street: string; zipCode: number; city: string; } {
      throw new Error('Function not implemented.');
    }
  };

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {

  }

}
