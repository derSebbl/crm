import { Component, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
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

  constructor(private route:ActivatedRoute,
    public dialog: MatDialog) { }

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
}
