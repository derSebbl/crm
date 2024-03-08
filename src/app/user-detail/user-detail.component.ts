import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

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

  openAdressDialog(){
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
  }

  editUserDetail(){
    const dialog = this.dialog.open(DialogEditUserComponent)
    dialog.componentInstance.user = new User(this.user.toJSON());
  }
}