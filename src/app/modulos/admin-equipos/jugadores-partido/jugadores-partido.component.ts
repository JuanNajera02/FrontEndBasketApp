import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EquiposService } from '../EquiposService/equipos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JugadoresParaPartido } from '../interfacesEquipos/JugadoresPartido';
import { JugadoresPart } from '../interfacesEquipos/JugadoresPartido';

@Component({
  selector: 'app-jugadores-partido',
  templateUrl: './jugadores-partido.component.html',
  styleUrls: ['./jugadores-partido.component.css']
})
export class JugadoresPartidoComponent implements OnInit{

  constructor(public dialog: MatDialog, private equipoServ: EquiposService, private route: ActivatedRoute, private router: Router ) { }

  nombreEquipo: any = '';
  jugadoresDeEquipoNoEnPartido: string[] = [];
  jugadorSeleccionado: string = '';
  jugadoresUsuario: string[] = [];
  selectedJugador: string = '';
  mensajeJugadorCancha: string = '';
  mensajeJugadoresPartidos: string = '';
  mensajeJugadorBanca: string = '';
  jugadoresEnPartido: JugadoresPart[] = [];
  jugadoresEnBanca: JugadoresPart[] = [];
  jugadoresEnCancha: JugadoresPart[] = [];
  clavePartido: any = '';
  equipo1: string = '';
  equipo2: string = '';
  jugadorParaPartido: JugadoresParaPartido = {
    equipo: '',
    jugador: {
      usuario: ''
    },
    partido: {
      clavePartido: 0
    }
  };

  ngOnInit(): void {
    this.nombreEquipo = localStorage.getItem('nombreEquipo');
    this.route.params.subscribe(params => {
      this.clavePartido = params['claveDelPartido'];
    });

    //obten el valor de clabe partido de la url

    this.obtenerEquipo1Equipo2();
    this.obtenerJugadoresDelPartido();
    this.obtenerJugadoresEnBanca();
    this.obtenerJugadoresEnCancha();

    //espera 2 segs y ejecuta la funcion
    setTimeout(() => {
      this.obtenerJugadoresdeEquipo();
    }, 2000);

    this.equipoServ.onModificacionJugadoresPartido().subscribe({
      next: () => {
        this.obtenerJugadoresDelPartido();
        this.obtenerJugadoresEnBanca();
        this.obtenerJugadoresEnCancha();
        this.obtenerJugadoresdeEquipo();
      }
    });

  }

  obtenerJugadoresdeEquipo() {
    console.log(this.equipo2);
    this.equipoServ.obtenerJugadoresDeEquipoNoEnPartido(this.nombreEquipo, this.clavePartido, this.equipo2).subscribe({
      next: (result: any) => {
        this.jugadoresDeEquipoNoEnPartido = result;

      }
    });
  }

  agregarJugadorAlPartido(jugador: string){
    this.jugadorParaPartido.equipo = this.nombreEquipo;
    this.jugadorParaPartido.jugador.usuario = jugador;
    this.jugadorParaPartido.partido.clavePartido = this.clavePartido;

    if(this.jugadorParaPartido.jugador.usuario == ''){
      this.mensajeJugadoresPartidos = 'No se selecciono ningun jugador';
      setTimeout(() => {
        this.mensajeJugadoresPartidos = ''; // Limpiar el mensaje
      }, 2000);
    }
    this.equipoServ.agregarJugadorPartido(this.jugadorParaPartido).subscribe({
      next: () => {
        this.mensajeJugadoresPartidos = 'Jugador agregado al partido';
        setTimeout(() => {
          this.mensajeJugadoresPartidos = ''; // Limpiar el mensaje
        }, 2000);
        this.selectedJugador = '';
        this.equipoServ.emitModificacionJugadoresPartido();
      }
    });
  }

  obtenerEquipo1Equipo2(){
    this.equipoServ.obtenerEquipo1Equipo2(this.clavePartido).subscribe({
      next: (result) => {
        this.equipo1 = (result as any).equipo1;
        this.equipo2 = (result as any).equipo2;
      }
    });
  }

  obtenerJugadoresDelPartido() {
    this.equipoServ.obtenerJugadoresDePartidoyEquipo(this.nombreEquipo, this.clavePartido).subscribe({
      next: (result: any) => {
        this.jugadoresEnPartido = result.map((item: any) => ({ jugador: item.jugador }));
      }
    });
  }

  posicionarEnCancha(jugador: string){
    if(jugador == ''){
      this.mensajeJugadorCancha = 'No se selecciono ningun jugador';
      setTimeout(() => {
        this.mensajeJugadorCancha = ''; // Limpiar el mensaje
      }, 2000);
    }else{
    this.equipoServ.posicionarJugador(this.clavePartido, jugador, false).subscribe({
      next: () => {
        this.mensajeJugadorCancha = 'Jugador ' + jugador +  ' posicionado en cancha';
        setTimeout(() => {
          this.mensajeJugadorCancha = ''; // Limpiar el mensaje
        }, 2000);
        this.equipoServ.emitModificacionJugadoresPartido();
        this.jugadorSeleccionado = '';
      }
    });
  }
  }

  posicionarEnBanca(jugador: string){
    this.equipoServ.posicionarJugador(this.clavePartido, jugador, true).subscribe({
      next: () => {
        this.mensajeJugadorBanca = 'Jugador ' + jugador + ' posicionado en banca';
        setTimeout(() => {
          this.mensajeJugadorBanca = ''; // Limpiar el mensaje
        }, 2000);
        this.equipoServ.emitModificacionJugadoresPartido();
        this.jugadorSeleccionado = '';
      }
    });
  }

  obtenerJugadoresEnBanca(){
    this.equipoServ.obtenerJugadoresDePartidoEnBanca(this.nombreEquipo, this.clavePartido, true).subscribe({
      next: (result: any) => {
        this.jugadoresEnBanca = result.map((item: any) => ({ jugador: item.jugador }));
      }
    });
  }

  obtenerJugadoresEnCancha(){
    this.equipoServ.obtenerJugadoresDePartidoEnCancha(this.nombreEquipo, this.clavePartido, false).subscribe({
      next: (result: any) => {
        this.jugadoresEnCancha = result.map((item: any) => ({ jugador: item.jugador }));
      }
    });
  }

}
