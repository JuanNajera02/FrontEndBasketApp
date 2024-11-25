import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateContestComponent } from './create-contest/create-contest.component';


const routes: Routes = [
  { path: '', component: CreateContestComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class ContestRoutingModule { }
