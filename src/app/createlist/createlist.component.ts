import { moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import * as CONSTANTS from '../constants';
import { Lists } from '../models/firebase.models';

@Component({
  selector: 'app-createlist',
  templateUrl: './createlist.component.html',
  styleUrls: ['./createlist.component.css'],
})
export class CreatelistComponent implements OnInit { /**, AfterViewInit */
  lists$: Observable<Lists[]> | undefined;
  dataSource = new MatTableDataSource<Lists>();
  displayedColumns: string[] = ['position', 'symbol', 'actions'];
  value = 'Symbol';

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild('table') table: MatTable<Lists>;

  constructor(private store: AngularFirestore) {

  }

  ngOnInit(): void {
    console.log('init...');

    this.lists$ = this.store
      .collection<Lists>(CONSTANTS.COLLECTION_LISTS)
      .valueChanges({ idField: 'id' });
    this.lists$.subscribe((value) => {
      console.log('resultat 2: ', value);
      this.dataSource.data = value;
      // this.dataSource.paginator = this.paginator;
    });

    console.log('init.');
  }
  // ngAfterViewInit() {
  //       this.dataSource.paginator = this.paginator;
  // }
  onCreate() {
    console.log('onCreate...');
    this.store
      .collection(CONSTANTS.COLLECTION_LISTS)
      .add({ symbol: this.value })
      .then((doc) => console.log('Document written with ID: ', doc.id))
      .catch((error) => console.error('Error adding document: ', error));
  }

  onDelete(elt: Lists) {
    console.log('onDelete...');

    console.log('elt', elt);

    this.store
      .collection(CONSTANTS.COLLECTION_LISTS)
      .doc(elt.id)
      .delete()
      .then(() => console.log('Document successfully deleted!'))
      .catch((error) => console.error('Error removing document: ', error));
    console.log('onDelete.');
  }
  onDropTable(event: any) {
    console.log('onDropTable...');
    console.log('event', event);
    moveItemInArray(
      this.dataSource.data,
      event.previousIndex,
      event.currentIndex
    );
    console.log('onDropTable.');
  }

  // onDropTable(event: CdkDragDrop<Lists[]>) {
  //   console.log('onDropTable...');
  //   console.log('event', event);
  //   console.log('onDropTable.');

  //   // moveItemInArray(
  //   //   this.dataSource.data,
  //   //   event.previousIndex,
  //   //   event.currentIndex
  //   // );

  //   // const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
  //   // moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
  //   // this.table.renderRows();
  // }
}
