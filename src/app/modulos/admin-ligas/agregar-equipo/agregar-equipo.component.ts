import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TemporadasService } from '../adminLigasService/temporadas.service';

@Component({
  selector: 'app-agregar-equipo',
  templateUrl: './agregar-equipo.component.html',
  styleUrls: ['./agregar-equipo.component.css']
})
export class AgregarEquipoComponent implements OnInit{

  constructor(private tempService: TemporadasService) {}

  temporadaId: number = 0;

  equipos: string[] = [];
  mensaje: string = "";
  selectedEquipo: string = '';

  ngOnInit(): void {
    this.temporadaId = +localStorage.getItem('idTemporada')!;
    this.obtenerEquiposSinTemporada(this.temporadaId);

    this.tempService.onNuevoEquipoAsignado().subscribe({
      next: () => {
        this.equipos = [];
        this.obtenerEquiposSinTemporada(this.temporadaId);
      }
    });

  }

  agregarEquipoTemp(tempId: number, nombreEquipo: string) {

    this.tempService.asignarEquipoATemporada(tempId, nombreEquipo).subscribe({
      next: () => {
        this.mensaje = "Equipo agregado correctamente";
        this.selectedEquipo = '';
        this.tempService.emitNuevoEquipoAsignado();
      },
      error: () => {
        if(nombreEquipo == '')
          this.mensaje = "Seleccione un equipo";
      }
    });
  }

  obtenerEquiposSinTemporada(idTemporada: number) {
    this.tempService.obtenerEquiposNoEnTemporada(idTemporada).subscribe({
      next: (result) => {
        result.forEach((element: any) => {
          this.equipos.push(element);
        })
      }
    });
  }

}

