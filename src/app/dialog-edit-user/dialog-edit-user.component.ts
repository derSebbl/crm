import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  firestore: Firestore = inject(Firestore);

  loading = false;
  birthDate!: Date;
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

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {

  }
}
