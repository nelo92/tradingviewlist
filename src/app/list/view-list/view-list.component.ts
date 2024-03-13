import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import * as CONSTANTS from '../../constants';
import { List, Symbol } from '../../models/firebase.models';
import { DialogCreateListComponent } from '../dialog-create-list/dialog-create-list.component';
import { ListService } from '../list.service';

export interface DialogCreateListData {
  element: string;
}

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
})
export class ViewListComponent implements OnInit, AfterViewInit {
  selectFormControl = new FormControl(null, Validators.required);

  formSymbol: FormGroup = this.formBuilder.group({
    symbol: [null, Validators.required],
  });

  dataSource = new MatTableDataSource<Symbol>();

  displayedColumns: string[] = ['symbol', 'actions'];

  @ViewChild('table') table: MatTable<Symbol> | undefined;

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  lists: List[] = [];
  selectedList: string = CONSTANTS.LIST_DEFAULT_NAME;
  disabledDeleteList: boolean = true;

  constructor(
    private store: AngularFirestore,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    console.log('init...');
    this.listService.loadList().subscribe((value) => {
      console.log('list resultat: ', value);
      this.lists = value;
      this.listService
        .loadSymbolOfList(this.selectedList)
        .subscribe((value) => {
          console.log('list symbol: ', value);
          this.dataSource.data = value;
        });
    });
    console.log('init.');
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  onChangeList() {
    console.log('onChangeList...');
    this.listService.loadSymbolOfList(this.selectedList).subscribe((value) => {
      console.log('list symbol: ', value);
      this.dataSource.data = value;
    });
    this.setDisabledDeleteList();
  }

  setDisabledDeleteList() {
     this.disabledDeleteList = this.selectedList == CONSTANTS.LIST_DEFAULT_NAME;
  }

  onDeleteList() {
    console.log('onDeleteList...');
    this.listService.deleteList(this.selectedList);
    this.selectedList = CONSTANTS.LIST_DEFAULT_NAME;
    this.onChangeList();
    console.log('onDeleteList.');
  }

  onCreateSymbol() {
    console.log('onCreateSymbol...');
    if (this.formSymbol.valid) {
      const symbol = this.formSymbol.value.symbol;
      const list = this.selectFormControl.value!;
      this.listService.createSymbolForList(symbol, list);
      this.formSymbol.reset();
    }
  }

  onDeleteSymbol(elt: Symbol) {
    console.log('onDeleteSymbol...');
    console.log('elt', elt);
    this.listService.deleteSymbol(this.selectedList, elt.id);
    console.log('onDeleteSymbol.');
  }

  onDropTable(event: CdkDragDrop<MatTableDataSource<Symbol>>) {
    console.log('onDropTable...');
    console.log('event', event);
    moveItemInArray(
      this.dataSource.data,
      event.previousIndex,
      event.currentIndex
    );
    this.table?.renderRows();
    console.log('onDropTable.');
  }

  onClickSymbol(elt: Symbol) {
    console.log('onClickSymbol...');
    console.log('elt', elt);
    window.open(this.generateLink(elt.name), '_blank');
    console.log('onClickSymbol.');
  }

  onOpenDialogCreateList(): void {
    console.log('onOpenDialogCreateList...');
    const dialogRef = this.dialog.open(DialogCreateListComponent, {
      data: { element: '' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('result: ', result);
      this.selectedList = result;
      this.setDisabledDeleteList();
    });
    console.log('onOpenDialogCreateList.');
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
