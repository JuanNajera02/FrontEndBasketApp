import { Component } from '@angular/core';
import { VistasGralService } from '../services/vistas-gral.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EstatusPartido } from '../../arbitros/interfaces/EstatusPartido';
import { PartidoEquipos } from '../../admin-equipos/interfacesEquipos/PartidoEquipos';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-busqueda-equipo',
  templateUrl: './busqueda-equipo.component.html',
  styleUrls: ['./busqueda-equipo.component.css']
})
export class BusquedaEquipoComponent implements OnInit {
  constructor(private vistasService: VistasGralService, private router: Router, private route: ActivatedRoute) { }

  texto: any = '';
  partidos: PartidoEquipos[] = [];
  estatusPartidos: EstatusPartido = EstatusPartido.TODOS;
  ExisteEquipo: boolean = false;

  ngOnInit(): void {
    // Obtén los parámetros de la ruta
    this.route.params.subscribe(params => {

      this.texto = params['texto'];

    });
      this.obtenerPartidosEquipo();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Obtén los nuevos parámetros de la ruta cuando cambie la URL
      this.route.params.subscribe(params => {
        this.texto = params['texto'];

          this.partidos = [];
          this.obtenerPartidosEquipo();

      });
    });
  }

  obtenerPartidosEquipo() {
    this.vistasService.obtenerPartidosDeEquipo(this.texto, this.estatusPartidos).subscribe({
      next: (data: any) => {
        this.ExisteEquipo = true;
        this.partidos = data;
        console.log(data);
      },
      error: (error) => {
        this.ExisteEquipo = false;
        console.log(error);
      }
    });
  }
  
  verPartido(idPartido: string){
    this.router.navigate(['/ver-estadisticas-de-jugador-por-partido',idPartido]);
  }

}
