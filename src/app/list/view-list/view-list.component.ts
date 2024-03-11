import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import * as CONSTANTS from '../../constants';
import { Lists } from '../../models/firebase.models';
import { DialogCreateListComponent } from '../dialog-create-list/dialog-create-list.component';

interface List {
  value: string;
  viewValue: string;
}

export interface DialogCreateListData {
  element: string;
}

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html'
})
export class ViewListComponent implements OnInit {
  /**, AfterViewInit */

  lists$: Observable<Lists[]> | undefined;
  dataSource = new MatTableDataSource<Lists>();
  displayedColumns: string[] = ['symbol', 'actions'];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('table') table!: MatTable<Lists>;

  formCreate: FormGroup = this.formBuilder.group({
    symbol: [null, Validators.required],
  });

  lists: List[] = [
    { value: 'list-0', viewValue: CONSTANTS.LIST_DEFAULT_NAME },
    // { value: 'list-1', viewValue: 'LIST1' },
    // { value: 'list-2', viewValue: 'LIST2' },
  ];
  selectedList = this.lists[0].value;

  constructor(
    private store: AngularFirestore,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    console.log('constructor...');
  }

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

  onOpenDialog(): void {
    console.log('onOpenDialog...');
    const dialogRef = this.dialog.open(DialogCreateListComponent, {
      data: { element: '' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('result: ', result);
    });
    console.log('onOpenDialog.');
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
