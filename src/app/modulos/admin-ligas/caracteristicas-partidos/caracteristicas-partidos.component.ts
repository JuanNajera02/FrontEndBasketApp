import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TemporadasService } from '../adminLigasService/temporadas.service';
import { PartidosCaracteristicas } from '../interfaces/PartidosCaracteristicas';

@Component({
  selector: 'app-caracteristicas-partidos',
  templateUrl: './caracteristicas-partidos.component.html',
  styleUrls: ['./caracteristicas-partidos.component.css']
})
export class CaracteristicasPartidosComponent implements OnInit{

  claveTemporada: any = '';
  mensaje: string = '';
  partidosCaracteristicas: PartidosCaracteristicas = {
    numeroEquiposTemporada: 0,
    cantidadDeEncuentros: 0,
    cantidadEquiposPlayOff: 0
  };

  cantidadEquiposPlayOff = [2, 4, 8, 16, 32];

  constructor(private tempService: TemporadasService) {}

  ngOnInit(): void {
    this.claveTemporada = localStorage.getItem('idTemporada');

  }

  guardarDatos(partidosCaracteristicas: PartidosCaracteristicas){
    console.log(partidosCaracteristicas);

    if(partidosCaracteristicas.cantidadEquiposPlayOff > partidosCaracteristicas.numeroEquiposTemporada){
      this.mensaje = 'La cantidad de equipos en playoff no puede ser mayor a la cantidad de equipos en la temporada';
      return;
    }
    //valida que cantidad de equipos no sea 0
    if(partidosCaracteristicas.numeroEquiposTemporada < 2){
      this.mensaje = 'La cantidad de equipos no puede ser menor de 2';
      return;
    }
    //valida que cantidad de encuentros no sea 0
    if(partidosCaracteristicas.cantidadDeEncuentros == 0){
      this.mensaje = 'La cantidad de encuentros no puede ser 0';
      return;
    }
    //valida que cantidad de equipos en playoff no sea 0
    if(partidosCaracteristicas.cantidadEquiposPlayOff < 2){
      this.mensaje = 'La cantidad de equipos en playoff no puede ser menor de 2';
      return;
    }

    this.tempService.modificarCaracteristicasTemp(partidosCaracteristicas, this.claveTemporada).subscribe({
      next: () => {
        this.mensaje = 'Caracteristicas modificadas correctamente';
        this.tempService.emitCaracteristicasTemporadaActualizadas();
      },
      error: (err) => {
        this.mensaje = err.error.mensaje;
      }
    });
  }

}
