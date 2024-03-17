import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { User } from '../../models/user.class';


@Component({
  selector: 'app-dialog-add-petcare',
  templateUrl: './dialog-add-petcare.component.html',
  styleUrl: './dialog-add-petcare.component.scss'
})
export class DialogAddPetcareComponent {

  constructor(public dialogRef: MatDialogRef<DialogAddPetcareComponent>) {

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
    petName: '',
    petAllergens: '',
    petInfo: false,
    careDays: 0,
    bills: 0,
    toJSON: function (): { firstName: string; lastName: string; email: string; street: string; zipCode: number; city: string;pet: string; petInfo: boolean; bills: number; petName: string; petAllergens: string; careDays: number;} {
      throw new Error('Function not implemented.');
    }
  };
  
}
