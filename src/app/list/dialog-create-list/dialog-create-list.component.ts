import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DialogCreateListData } from '../view-list/view-list.component';

@Component({
  selector: 'app-dialog-create-list',
  templateUrl: './dialog-create-list.component.html',
})
export class DialogCreateListComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogCreateListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCreateListData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
