import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import * as CONSTANTS from '../constants';
import { Lists } from '../models/firebase.models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createlist',
  templateUrl: './createlist.component.html',
  styleUrls: ['./createlist.component.css'],
})
export class CreatelistComponent implements OnInit {
  /**, AfterViewInit */

  lists$: Observable<Lists[]> | undefined;
  dataSource = new MatTableDataSource<Lists>();
  displayedColumns: string[] = ['symbol', 'actions'];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('table') table!: MatTable<Lists>;

  formCreate: FormGroup = this.formBuilder.group({
    symbol: [null, Validators.required],
  });

  constructor(
    private store: AngularFirestore,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log('init...');
    this.lists$ = this.store
      .collection<Lists>(CONSTANTS.COLLECTION_LISTS)
      .valueChanges({ idField: 'id' });
    this.lists$.subscribe((value) => {
      console.log('resultat: ', value);
      this.dataSource.data = value;
    });
    console.log('init.');
  }
  // ngAfterViewInit() {
  //       this.dataSource.paginator = this.paginator;
  // }

  onSubmitCreate() {
    console.log('onSubmitCreate...');
    if (this.formCreate.valid) {
      let value = this.formCreate.value.symbol;
      this.store
        .collection(CONSTANTS.COLLECTION_LISTS)
        .add({ symbol: value })
        .then((doc) => console.log('Document written with ID: ', doc.id))
        .catch((error) => console.error('Error adding document: ', error));
      this.formCreate.reset();
    }
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

  onDropTable(event: CdkDragDrop<MatTableDataSource<Lists>>) {
    console.log('onDropTable...');
    console.log('event', event);
    moveItemInArray(
      this.dataSource.data,
      event.previousIndex,
      event.currentIndex
    );
    this.table.renderRows();
    console.log('onDropTable.');
  }

  onClick(elt: Lists) {
    console.log('onClick...');
    console.log('elt', elt);
    window.open(this.generateLink(elt.symbol), '_blank');
    console.log('onClick.');
  }

  generateLink(symbol: string): string {
    return (
      CONSTANTS.TRADINGVIEW_SYMBOL_LINK +
      CONSTANTS.TRADINGVIEW_EXCHANGE_BINANCE +
      CONSTANTS.TRADINGVIEW_SYMBOL_LINK_SEP +
      symbol
    );
  }
}
