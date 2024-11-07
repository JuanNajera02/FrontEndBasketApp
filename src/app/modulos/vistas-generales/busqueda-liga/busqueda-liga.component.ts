import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { VistasGralService } from '../services/vistas-gral.service';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Temporadas } from '../interfaces/Temporadas';
import { NavBarService } from '../../nav-bar/servicios/nav-bar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-busqueda-liga',
  templateUrl: './busqueda-liga.component.html',
  styleUrls: ['./busqueda-liga.component.css']
})
export class BusquedaLigaComponent implements OnInit {

  constructor(private searchService: NavBarService, private vistasService: VistasGralService, private router: Router, private route: ActivatedRoute) { }

  nombreLiga: any = '';
  idLigas: string = '';
  temporadas: Temporadas[] = [];
  nombreTemporada: string = '';
  idTemporada: string = '';

  ngOnInit(): void {
    // Obtén los parámetros de la ruta
    this.route.params.subscribe(params => {

      this.nombreLiga = params['texto'];
      this.idLigas = params['ligaId'];

    });
      //this.obtenerPartidosEquipo();
      this.obtenerTemporadas();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Obtén los nuevos parámetros de la ruta cuando cambie la URL
      this.route.params.subscribe(params => {
        this.nombreLiga = params['texto'];
        this.idLigas = params['ligaId'];

        //  this.partidos = [];
        this.obtenerTemporadas();

      });
    });
  }

  obtenerTemporadas(){
    this.vistasService.obtenerTemporadasDeLiga(this.idLigas).subscribe({
      next: (data: any) => {
        console.log(data);
        this.temporadas = data;
        console.log(this.temporadas);
      },
      error: (error) => {
        console.error('Error al obtener las temporadas', error);
      }
    });
  }

  irATemporada(nombreTemp: string){
    this.obtenerTemporadaId(nombreTemp).subscribe({
      next: (data: any) => {
        this.idTemporada = data[0].claveTemporada;
        this.router.navigate(['/buscar-temporada', nombreTemp, this.idTemporada]);
      }
    });

    this.router.navigate(['/buscar-temporada', this.nombreLiga, nombreTemp]);
  }

  obtenerTemporadaId(nombreTemp: string): Observable<any> {
    return this.searchService.searchTemporadas(nombreTemp);
  }

}
