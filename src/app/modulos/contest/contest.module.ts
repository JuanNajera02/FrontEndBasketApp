import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateContestComponent } from './create-contest/create-contest.component';
import { ContestRoutingModule } from './contest-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { ContestManagementComponent } from './contest-management/contest-management.component';
import { SideNavContestManagementComponent } from './side-nav-contest-management/side-nav-contest-management.component';



@NgModule({
  declarations: [
    CreateContestComponent,
    ContestManagementComponent,
    SideNavContestManagementComponent,
  ],
  imports: [
    CommonModule,
    ContestRoutingModule, // ROUTES
    ReactiveFormsModule,
    AngularMaterialModule,
    GoogleMapsModule,
  ],
  exports:[
    CreateContestComponent
  ]
})
export class ContestModule { }
