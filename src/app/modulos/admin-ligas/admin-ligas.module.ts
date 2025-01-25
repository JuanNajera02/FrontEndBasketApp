import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminLigasComponent } from './home-admin-ligas/home-admin-ligas.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CrearLigaComponent } from './crear-liga/crear-liga.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TemporadaCaracteriticasComponent } from './temporada-caracteriticas/temporada-caracteriticas.component';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { AsignarArbitroComponent } from './asignar-arbitro/asignar-arbitro.component';
import { ModificarLigaComponent } from './modificar-liga/modificar-liga.component';
import { CrearTemporadaComponent } from './crear-temporada/crear-temporada.component';
import { AgregarArbitroPartidoComponent } from './agregar-arbitro-partido/agregar-arbitro-partido.component';
import { AgregarFechaPartidoComponent } from './agregar-fecha-partido/agregar-fecha-partido.component';
import { FooterModule } from '../footer/footer.module';
import { CaracteristicasPartidosComponent } from './caracteristicas-partidos/caracteristicas-partidos.component';
import { DirectiveModule } from 'src/app/directives/directive.module';

@NgModule({
  declarations: [
    HomeAdminLigasComponent,
    CrearLigaComponent,
    TemporadaCaracteriticasComponent,
    AsignarArbitroComponent,
    ModificarLigaComponent,
    CrearTemporadaComponent,
    AgregarArbitroPartidoComponent,
    AgregarFechaPartidoComponent,
    CaracteristicasPartidosComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    BrowserAnimationsModule,
    NavBarModule,
    FooterModule,
    DirectiveModule
  ],
  exports: [
    HomeAdminLigasComponent,
    CrearLigaComponent,
    TemporadaCaracteriticasComponent,
    AsignarArbitroComponent,
    ModificarLigaComponent
  ]
})
export class AdminLigasModule { }
