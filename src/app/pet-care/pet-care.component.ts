import { Component, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pet-care',
  templateUrl: './pet-care.component.html',
  styleUrl: './pet-care.component.scss'
})
export class PetCareComponent {

  firestore: Firestore = inject(Firestore);
  users$!: Observable<any[]>;

  userId = '';
  user = new User();
  selectedhalf: any;
  selectedfull: any;

  constructor(
    private route:ActivatedRoute,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.userId = paramMap.get('id')!;
      this.getUser();
  })
  }

  async getUser(){
    const userDoc = doc(this.firestore, 'users', this.userId);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      this.user = new User();
      Object.assign(this.user, userSnapshot.data());
    } else {
      console.log('No such user!');
    }
  }
  setBill(){
    const userRef = doc(this.firestore, 'users', this.userId);
    let valueHalf = Number(this.selectedhalf) || 0; 
    let valueFull = Number(this.selectedfull) || 0; 
    getDoc(userRef).then((userDoc) => {
      if (userDoc.exists()) {
        const userData = userDoc.data();
        let currentBill = userData?.['bills'] || 0; 
        currentBill = parseInt(currentBill); 
        updateDoc(userRef, {
          bill: currentBill + valueFull*200 + valueHalf*100
        });
      }
    })
  }
}

