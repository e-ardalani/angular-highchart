import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Chart1Component} from './pages/chart1/chart1.component';
import {Chart2Component} from './pages/chart2/chart2.component';


const routes: Routes = [
  {
    path: '',
    component: Chart1Component
  },
  {
    path: 'chart2',
    component: Chart2Component
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
