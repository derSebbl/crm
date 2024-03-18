import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, collectionData, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss'
})
export class PetsComponent {
  firestore: Firestore = inject(Firestore);
  users$!: Observable<any[]>;
  user: any;
  
  


  constructor(public dialog: MatDialog) {
    const aCollection = collection(this.firestore, 'users')
    this.users$ = collectionData(aCollection);
    this.users$ = collectionData(aCollection, {idField: 'id'});
   }

  ngOnInit(): void{
    }

    calculateTimeDifference(timestamp: string): string {
      const petInfoDate = new Date(parseInt(timestamp));
      const currentDate = new Date();
      const remainingTimeInMilliseconds = petInfoDate.getTime() - currentDate.getTime();
      const remainingDays = Math.ceil(remainingTimeInMilliseconds / (1000 * 60 * 60 * 24));
      if (isNaN(remainingDays) || remainingDays === 0) {
        return '';
      } else {
      return `${remainingDays} Day(s) remaining`;
    }
  }
}