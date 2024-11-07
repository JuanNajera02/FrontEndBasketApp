import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [
    FooterComponentComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    FooterComponentComponent
  ]
})
export class FooterModule { }
