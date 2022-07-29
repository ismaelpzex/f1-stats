import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './components/results/results.component';

const routes: Routes = [
  { path: " ", pathMatch: 'full', redirectTo: '/results' },
  { path: "results", component: ResultsComponent },
  { path: "**", redirectTo: '/results' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
