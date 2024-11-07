import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeJugadorComponent } from 'src/app/modulos/jugadores/home-jugador/home-jugador.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [
    HomeJugadorComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    HomeJugadorComponent
  ]
})
export class JugadoresModule { }
