import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetAutocompleteDirective } from './set-auto-complete.directive';



@NgModule({
  declarations: [SetAutocompleteDirective],
  imports: [
    CommonModule
  ],
  exports: [SetAutocompleteDirective]
})
export class DirectiveModule { }
