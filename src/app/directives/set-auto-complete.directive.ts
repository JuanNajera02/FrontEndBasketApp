import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: "input" // Automatically applies to all <input> elements
})
export class SetAutocompleteDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Set the autocomplete attribute to "off"
    this.renderer.setAttribute(this.el.nativeElement, 'autocomplete', 'off');
  }
}
