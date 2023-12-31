import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarJugadoresComponent } from './administrar-jugadores.component';

describe('AdministrarJugadoresComponent', () => {
  let component: AdministrarJugadoresComponent;
  let fixture: ComponentFixture<AdministrarJugadoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarJugadoresComponent]
    });
    fixture = TestBed.createComponent(AdministrarJugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
