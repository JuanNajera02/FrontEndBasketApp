import { Component } from '@angular/core';
import { EquiposService } from '../EquiposService/equipos.service';
import { OnInit } from '@angular/core';
import { Jugador } from '../interfacesEquipos/Jugador';
import { NuevoJugador } from '../interfacesEquipos/NuevoJugador';
import { Jugadores } from '../interfacesEquipos/NuevoJugador';

@Component({
  selector: 'app-administrar-jugadores',
  templateUrl: './administrar-jugadores.component.html',
  styleUrls: ['./administrar-jugadores.component.css']
})
export class AdministrarJugadoresComponent implements OnInit{

  constructor(private equiposService: EquiposService) {}

  nombreEquipo: string = '';
  jugadoresUsuario: string[] = [];
  selectedJugador: string = '';
  mensaje: string = '';
  mensajeEliminar: string = '';
  jugadorNuevo: NuevoJugador = {
    equipoNombre: this.nombreEquipo,
    jugadorUsuario: this.selectedJugador,
    posicion: ''
  };
  jugadoresEnEquipo: { usuario: string, posicion: string }[] = [];

  ngOnInit(): void {
    this.nombreEquipo = localStorage.getItem('nombreEquipo')!;
    this.obtenerJugadoresParaEquipo(this.nombreEquipo);

    this.obtenerJugadoresdeEquipo();

    this.equiposService.onModificacionJugadores().subscribe({
      next: () => {
        this.obtenerJugadoresdeEquipo();
        this.obtenerJugadoresParaEquipo(this.nombreEquipo)
      }
    });

  }

  obtenerJugadoresParaEquipo(equipo: string) {
    this.equiposService.obtenerJugadoresParaEquipo(equipo).subscribe({
      next: (result) => { // No especifica el tipo en la función next
        this.jugadoresUsuario = (result as Jugador[]).map(jugador => jugador.usuario);

      }
    });
  }

  agregarJugador(jugador: string, posicion: string) {
    if (posicion === '') {
      this.mensaje = 'No se ha seleccionado una posición';
      return;
    }
    this.jugadorNuevo.equipoNombre = this.nombreEquipo;
    this.jugadorNuevo.jugadorUsuario = jugador;
    this.jugadorNuevo.posicion = posicion;
    this.equiposService.agregarJugadorAEquipo(this.jugadorNuevo).subscribe({
      next: (result) => {
        this.mensaje = result.message;
        this.equiposService.emitModificacionJugadores();
        this.selectedJugador = '';
        this.jugadorNuevo.posicion = '';
      },
      error: (error) => {
        this.mensaje = error.error[0].message;
      }
    });
  }

  obtenerJugadoresdeEquipo() {
    this.equiposService.obtenerJugadoresdeEquipo(this.nombreEquipo).subscribe({
      next: (result) => {
        this.jugadoresEnEquipo = (result as Jugadores[]).map(jugador => {
          return {
            usuario: jugador.jugador.usuario,
            posicion: jugador.posicion
          };
        });
      }
    });
  }

  eliminarJugador(jugador: string) {
    this.equiposService.eliminarJugadorDeEquipo(jugador, this.nombreEquipo).subscribe({
      next: (result: any) => {
        this.mensajeEliminar = result.message;
        this.equiposService.emitModificacionJugadores();
      },
      error: (error) => {
        this.mensajeEliminar = error.error[0].message;
      }
    });
  }

}
