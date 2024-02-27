import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'createlist', pathMatch: 'full' },
  {
    path: 'createlist',
    loadComponent: () =>
      import('./createlist/createlist.component').then(
        (m) => m.CreatelistComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
