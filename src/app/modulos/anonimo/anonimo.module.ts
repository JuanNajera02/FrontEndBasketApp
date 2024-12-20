import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAnonimoComponent } from './home-anonimo/home-anonimo.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [
    HomeAnonimoComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    HomeAnonimoComponent
  ]
})
export class AnonimoModule { }
