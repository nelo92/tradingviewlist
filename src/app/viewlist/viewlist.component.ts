import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as CONSTANTS from '../constants';

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.component.html',
  styleUrls: ['./viewlist.component.css'],
})
export class ViewlistComponent {

  // constructor(private store: AngularFirestore){
  //   this.store.collection(CONSTANTS.COLLECTION_LISTS).valueChanges().subscribe(res => {
  //     console.log(res);
  //   });
  // }

}
