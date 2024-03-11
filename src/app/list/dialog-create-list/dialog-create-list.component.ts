import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DialogCreateListData } from '../view-list/view-list.component';
import { ListService } from '../list.service';

@Component({
  selector: 'app-dialog-create-list',
  templateUrl: './dialog-create-list.component.html',
})
export class DialogCreateListComponent {
  formCreate: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
  });

  valueFormControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<DialogCreateListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCreateListData,
    private formBuilder: FormBuilder,
    private listService: ListService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
  onCreate() {
    console.log('onCreate');
    if (this.formCreate.valid) {
      this.data.element = this.formCreate.value.name;
      this.dialogRef.close(this.data.element);
    }
  }
}
