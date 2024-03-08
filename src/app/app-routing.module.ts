import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatelistComponent } from './createlist/createlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'create', pathMatch: 'full' },
  { path: 'create', component: CreatelistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
