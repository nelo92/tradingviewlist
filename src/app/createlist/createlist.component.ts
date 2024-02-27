import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Lists } from '../models/firebase.models';
import * as CONSTANTS from '../constants';



@Component({
  selector: 'app-createlist',
  templateUrl: './createlist.component.html',
  styleUrls: ['./createlist.component.css'],
})
export class CreatelistComponent implements OnInit {
  value = 'Symbol';
  //  symbolFormControl = new FormControl('', [Validators.required, Validators.email]);

  lists$: Observable<Lists[]> | undefined;

  constructor(private store: AngularFirestore) {}

  ngOnInit(): void {
    console.log('init...');

    this.lists$ = this.store.collection(CONSTANTS.COLLECTION_LISTS).valueChanges({ id: 'id' }) as Observable<Lists[]>;
    console.log(this.lists$);

  }

  onCreate() {
    console.log('onCreate...');
    this.store.collection(CONSTANTS.COLLECTION_LISTS).add({symbol: this.value});
  }
}
