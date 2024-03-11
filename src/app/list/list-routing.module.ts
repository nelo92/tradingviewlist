import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewListComponent } from './view-list/view-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'view' },
  { path: 'view', component: ViewListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
