import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { VistasGralService } from '../services/vistas-gral.service';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { equiposRanking } from '../interfaces/equiposRanking';

@Component({
  selector: 'app-busqueda-temporada',
  templateUrl: './busqueda-temporada.component.html',
  styleUrls: ['./busqueda-temporada.component.css']
})
export class BusquedaTemporadaComponent implements OnInit {

    constructor(private vistasService: VistasGralService, private router: Router, private route: ActivatedRoute) { }

    texto: any = '';
    temporadaId: any = '';
    equiposRanking: equiposRanking[] = [];

    ngOnInit(): void {
      // Obtén los parámetros de la ruta
      this.route.params.subscribe(params => {

        this.texto = params['texto'];
        this.temporadaId = params['temporadaId'];
        console.log("temporadaId:" + this.temporadaId)

      });
        this.obtenerRankingEquipos();

      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        // Obtén los nuevos parámetros de la ruta cuando cambie la URL
        this.route.params.subscribe(params => {
          this.texto = params['texto'];
          this.temporadaId = params['temporadaId'];

          //  this.partidos = [];
            //this.obtenerPartidosEquipo();
          this.obtenerRankingEquipos();
        });
      });
    }

    obtenerRankingEquipos() {
      this.vistasService.obtenerPartidosTemporadaRegular(this.temporadaId).subscribe({
        next: (data: any) => {
          console.log(data);

          // Convertir el objeto en un array de objetos
          this.equiposRanking = Object.keys(data).map(key => ({
            nombreEquipo: key,
            perdidos: data[key].perdidos,
            jugados: data[key].jugados,
            ganados: data[key].ganados,
            puntosTemporada: data[key].puntosTemporada,
            puntosJugador: data[key].puntosJugador,
            rango: 0  // Inicializar la propiedad rango
          } as equiposRanking));  // Asegúrate de que cada objeto sea del tipo EquiposRanking

          // Ordenar por cantidad de partidos ganados, perdidos, jugados y puntosJugador
          this.equiposRanking.sort((a, b) => {
            const compareGanados = b.ganados - a.ganados;
            const comparePerdidos = a.perdidos - b.perdidos;
            const compareJugados = a.jugados - b.jugados;

            // Si hay empate en partidos ganados, perdidos y jugados, verifica puntos del jugador
            if (compareGanados === 0 && comparePerdidos === 0 && compareJugados === 0) {
              return b.puntosJugador - a.puntosJugador;
            }

            // Si no hay empate en partidos ganados, perdidos y jugados, ordena según esos criterios
            if (compareGanados !== 0) {
              return compareGanados;
            }

            if (comparePerdidos !== 0) {
              return comparePerdidos;
            }

            return compareJugados;
          });

          // Asignar rangos a los equipos
          this.equiposRanking.forEach((equipo, index) => {
            equipo.rango = index + 1;  // Agregar el rango a cada equipo
          });

          console.log(this.equiposRanking);
        },
        error: (error: any) => {
          console.error('Error al obtener el ranking de equipos:', error);
        }
      });
    }

    verEstadisticas(temporadaId: string, nombreEquipo: string) {
      this.router.navigate(['/estadisticas-temporada', temporadaId, nombreEquipo]);
    }

    verRanking(temporadaId: string) {
      this.router.navigate(['/ranking-jugadores-temporada', temporadaId]);

    }

  }

