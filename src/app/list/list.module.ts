import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewListComponent } from './view-list/view-list.component';
import { DialogCreateListComponent } from './dialog-create-list/dialog-create-list.component';

@NgModule({
  declarations: [ViewListComponent, DialogCreateListComponent],
  imports: [CommonModule],
})
export class ListModule {}
