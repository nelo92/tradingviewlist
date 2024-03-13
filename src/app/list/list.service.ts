import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import * as CONSTANTS from '../constants';
import { List, Symbol } from '../models/firebase.models';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private store: AngularFirestore) {}

  // -- List --

  createList(value: string) {
    console.log('ListService - createList');
    this.store
      .collection(`${CONSTANTS.COLLECTION_LISTS}`)
      .doc(value)
      .set({ name: value })
      .then((doc) => console.log('Document written with ID: ', value))
      .catch((error) => console.error('Error adding document: ', error));
  }

  loadList(): Observable<List[]> {
    console.log('ListService - loadList');
    const list$ = this.store
      .collection<List>(CONSTANTS.COLLECTION_LISTS)
      .valueChanges({ idField: 'id' });
    // create default list is no default list exist
    list$.subscribe((value) => {
      console.log('ListService - loadList - value', value);
      if (value.length === 0) this.createList(CONSTANTS.LIST_DEFAULT_NAME);
    });
    return list$;
  }

  // -- Symbol --

  loadSymbolOfList(list: string): Observable<Symbol[]> {
    return this.store
      .collection<Symbol>(
        `${CONSTANTS.COLLECTION_LISTS}/${list}/${CONSTANTS.COLLECTION_SYMBOLS}`
      )
      .valueChanges({ idField: 'id' });
  }

  createSymbolForList(symbol: string, list: string) {
    this.store
      .collection(
        `${CONSTANTS.COLLECTION_LISTS}/${list}/${CONSTANTS.COLLECTION_SYMBOLS}`
      )
      .add({ name: symbol })
      .then((doc) => console.log('Document written with ID: ', doc.id))
      .catch((error) => console.error('Error adding document: ', error));
  }

  // createSymbol(value: string) {
  //   this.store
  //     .collection(CONSTANTS.COLLECTION_LISTS)
  //     .add({ symbol: value })
  //     .then((doc) => console.log('Document written with ID: ', doc.id))
  //     .catch((error) => console.error('Error adding document: ', error));
  // }
  deleteSymbol(list: string, id: string) {
      this.store
        .doc(`${CONSTANTS.COLLECTION_LISTS}/${list}/${CONSTANTS.COLLECTION_SYMBOLS}/${id}`)
        .delete()
        .then(() => console.log('Document successfully deleted!'))
        .catch((error) => console.error('Error removing document: ', error));
  }
  // createSymbol(value: string) {
  //   this.store
  //     .collection(CONSTANTS.COLLECTION_LISTS)
  //     .add({ symbol: value })
  //     .then((doc) => console.log('Document written with ID: ', doc.id))
  //     .catch((error) => console.error('Error adding document: ', error));
  // }
  // deleteSymbol(id: string) {
  //   this.store
  //     .collection(CONSTANTS.COLLECTION_LISTS)
  //     .doc(id)
  //     .delete()
  //     .then(() => console.log('Document successfully deleted!'))
  //     .catch((error) => console.error('Error removing document: ', error));
  // }
}
