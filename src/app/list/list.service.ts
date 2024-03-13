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

  deleteList(list: string) {
    this.store
      .doc(`${CONSTANTS.COLLECTION_LISTS}/${list}`)
      .collection(CONSTANTS.COLLECTION_SYMBOLS)
      .ref.get()
      .then((qry) => {
        qry.forEach((doc) => {
          doc.ref.delete();
        });
      });
    this.store
      .doc(`${CONSTANTS.COLLECTION_LISTS}/${list}`)
      .delete()
      .then(() => console.log('Document successfully deleted!'))
      .catch((error) => console.error('Error removing document: ', error));
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
      .doc(symbol)
      .set({ name: symbol })
      .then((doc) => console.log('Document written with ID: ', symbol))
      .catch((error) => console.error('Error adding document: ', error));
  }

  deleteSymbol(list: string, id: string) {
    this.store
      .doc(
        `${CONSTANTS.COLLECTION_LISTS}/${list}/${CONSTANTS.COLLECTION_SYMBOLS}/${id}`
      )
      .delete()
      .then(() => console.log('Document successfully deleted!'))
      .catch((error) => console.error('Error removing document: ', error));
  }

}
