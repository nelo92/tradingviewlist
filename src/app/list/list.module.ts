import { CommonModule, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogCreateListComponent } from './dialog-create-list/dialog-create-list.component';
import { ListRoutingModule } from './list-routing.module';
import { ViewListComponent } from './view-list/view-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ViewListComponent, DialogCreateListComponent],
  imports: [
    // Common
    NgIf,
    DragDropModule,
    // Material
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // --
    CommonModule,
    ListRoutingModule,
  ],
})
export class ListModule {}
