import { Component, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, interval } from 'rxjs';

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
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.userId = paramMap.get('id')!;
      this.getUser();
      interval(60 * 60 * 1000).subscribe(() => this.checkPetInfo());
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
        let currentBill = userData?.['bill'] || 0; 
        currentBill = parseInt(currentBill); 
        updateDoc(userRef, {
          bill: currentBill + valueFull*200 + valueHalf*100
        });
      }
    })
    this.clearFields();
    this.setPetInfoTrue();
  }

  clearFields(){
    this.selectedhalf = '';
    this.selectedfull = '';
    this.backToPets();
  }

  backToPets(){
    this.router.navigate(['/pets']);
  }

  setPetInfoTrue() {
    const userRef = doc(this.firestore, 'users', this.userId);
    const future = Date.now() + ((this.selectedfull + this.selectedhalf) * 60 * 60 * 1000)
    updateDoc(userRef, {
      petInfo: true,
      PetInfoTimestamp: future
    });
  }

  checkPetInfo() {
    const userRef = doc(this.firestore, 'users', this.userId);
    getDoc(userRef).then((userDoc) => {
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const petInfoTimestamp = userData?.['PetInfoTimestamp'];

        const petInfoDate = new Date(petInfoTimestamp);
        petInfoDate.setHours(0, 0, 0, 0);

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (+petInfoDate === +currentDate) {
          updateDoc(userRef, {
            petInfo: false
          });
        }
      }
    });
  }

}

