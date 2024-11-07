import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { VistasGralService } from '../services/vistas-gral.service';
import { OnInit } from '@angular/core';
import { JugadorTirosLibres } from '../interfaces/JugadorTirosLibres';
import { JugadorTiros2Puntos } from '../interfaces/JugadorTirosLibres';
import { JugadorTiros3Puntos } from '../interfaces/JugadorTirosLibres';
import { JugadorAsistencias } from '../interfaces/JugadorTirosLibres';

@Component({
  selector: 'app-ranking-jugadores-temporada',
  templateUrl: './ranking-jugadores-temporada.component.html',
  styleUrls: ['./ranking-jugadores-temporada.component.css']
})
export class RankingJugadoresTemporadaComponent implements OnInit{

  temporadaId: any = '';
  tirosLibres: JugadorTirosLibres[] = [];
  tiros2Puntos: JugadorTiros2Puntos[] = [];
  tiros3Puntos: JugadorTiros3Puntos[] = [];
  asistencias: JugadorAsistencias[] = [];

  constructor(private vistasService: VistasGralService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.temporadaId = params['temporadaId'];
      this.obtenerRankingJugadoresTirosLibres();
      this.obtenerRankingJugadoresTiros2Puntos();
      this.obtenerRankingJugadoresTiros3Puntos();
      this.obtenerRankingJugadoresAsistencias();
    });
  }

  obtenerRankingJugadoresTirosLibres() {
    this.vistasService.obtenerTopJugadoresTirosLibres(this.temporadaId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.tirosLibres = Object.keys(data).map(key => ({
          posicion: data[key].posicion, // Corregir esta línea
          tirosLibres: data[key].tirosLibres,
          equipo: data[key].equipo,
          nombre: data[key].nombre
        }));
        //sort by posicion
        this.tirosLibres.sort((a, b) => (a.posicion > b.posicion) ? 1 : -1);

      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  obtenerRankingJugadoresTiros2Puntos() {
    this.vistasService.obtenerTopJugadoresTirosDe2Puntos(this.temporadaId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.tiros2Puntos = Object.keys(data).map(key => ({
          posicion: data[key].posicion, // Corregir esta línea
          tiros2Puntos: data[key].tirosDe2Puntos,
          equipo: data[key].equipo,
          nombre: data[key].nombre
        }));
        //sort by posicion
        this.tiros2Puntos.sort((a, b) => (a.posicion > b.posicion) ? 1 : -1);

      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  obtenerRankingJugadoresTiros3Puntos() {
    this.vistasService.obtenerTopJugadoresTirosDe3Puntos(this.temporadaId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.tiros3Puntos = Object.keys(data).map(key => ({
          posicion: data[key].posicion, // Corregir esta línea
          tiros3Puntos: data[key].tirosDe3Puntos,
          equipo: data[key].equipo,
          nombre: data[key].nombre
        }));
        //sort by posicion
        this.tiros3Puntos.sort((a, b) => (a.posicion > b.posicion) ? 1 : -1);

      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  obtenerRankingJugadoresAsistencias() {
    this.vistasService.obtenerTopJugadoresAsistencias(this.temporadaId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.asistencias = Object.keys(data).map(key => ({
          posicion: data[key].posicion, // Corregir esta línea
          asistencias: data[key].asistencias,
          equipo: data[key].equipo,
          nombre: data[key].nombre
        }));
        //sort by posicion
        this.asistencias.sort((a, b) => (a.posicion > b.posicion) ? 1 : -1);

      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
