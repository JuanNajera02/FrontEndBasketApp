import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaUsuarioComponent } from './busqueda-usuario.component';

describe('BusquedaUsuarioComponent', () => {
  let component: BusquedaUsuarioComponent;
  let fixture: ComponentFixture<BusquedaUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaUsuarioComponent]
    });
    fixture = TestBed.createComponent(BusquedaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
