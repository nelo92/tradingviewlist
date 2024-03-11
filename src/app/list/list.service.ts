import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import * as CONSTANTS from '../constants';
import { Lists } from '../models/firebase.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private store: AngularFirestore) {}

  // -- List --
  createList() {
    console.log('ListService - createList');
    // TODO MAU - CREATION DE LA LISTE (NAME)
  }

  loadList(): Observable<Lists[]> {
    return this.store
      .collection<Lists>(CONSTANTS.COLLECTION_LISTS)
      .valueChanges({ idField: 'id' });
  }

  // -- Symbol --
  createSymbol(value: string) {
    this.store
      .collection(CONSTANTS.COLLECTION_LISTS)
      .add({ symbol: value })
      .then((doc) => console.log('Document written with ID: ', doc.id))
      .catch((error) => console.error('Error adding document: ', error));
  }
  deleteSymbol(id: string) {
    this.store
      .collection(CONSTANTS.COLLECTION_LISTS)
      .doc(id)
      .delete()
      .then(() => console.log('Document successfully deleted!'))
      .catch((error) => console.error('Error removing document: ', error));
  }
}
