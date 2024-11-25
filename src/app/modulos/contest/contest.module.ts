import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateContestComponent } from './create-contest/create-contest.component';
import { ContestRoutingModule } from './contest-routing.module';



@NgModule({
  declarations: [
    CreateContestComponent
  ],
  imports: [
    CommonModule,
    ContestRoutingModule // ROUTES
  ],
  exports:[
    CreateContestComponent
  ]
})
export class ContestModule { }
