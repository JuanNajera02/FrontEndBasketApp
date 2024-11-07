import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { VistasGralService } from '../services/vistas-gral.service';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { EstadisticasPorJugador } from '../interfaces/EstadisticasPorJugador';

@Component({
  selector: 'app-estadisticas-temporada',
  templateUrl: './estadisticas-temporada.component.html',
  styleUrls: ['./estadisticas-temporada.component.css']
})
export class EstadisticasTemporadaComponent implements OnInit {

  constructor(private vistasService: VistasGralService, private router: Router, private route: ActivatedRoute) { }

  nombreEquipo: any = '';
  temporadaId: any = '';

  estadisticasArray: { key: string; value: EstadisticasPorJugador }[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nombreEquipo = params['nombreEquipo'];
      this.temporadaId = params['temporadaId'];
      console.log("temporadaId:" + this.temporadaId)
      console.log("nombreEquipo:" + this.nombreEquipo)
    });

    this.obtenerEstadisticasEquipoYTemporada();
  }

  obtenerEstadisticasEquipoYTemporada() {
    this.vistasService.obtenerEstadisticasEquipoYTemporada(this.nombreEquipo, this.temporadaId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.estadisticasArray = Object.entries(data).map(([key, value]) => ({ key, value: value as EstadisticasPorJugador }));
        console.log(this.estadisticasArray);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
