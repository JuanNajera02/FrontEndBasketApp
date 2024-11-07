import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
  ],
  exports: [
    NavBarComponent
  ]
})
export class NavBarModule { }
