import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EstatusPartido } from '../../arbitros/interfaces/EstatusPartido';
import { PartidoEquipos } from '../../admin-equipos/interfacesEquipos/PartidoEquipos';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { JugadoresService } from '../services/jugadores.service';

@Component({
  selector: 'app-home-jugador',
  templateUrl: './home-jugador.component.html',
  styleUrls: ['./home-jugador.component.css']
})
export class HomeJugadorComponent implements OnInit{
  constructor(private router: Router, private route: ActivatedRoute, private jugadores: JugadoresService) { }

  partidos: PartidoEquipos[] = [];
  estatusPartidos: EstatusPartido = EstatusPartido.TODOS;
  usuario: any = '';

  ngOnInit(): void {

    this.usuario = localStorage.getItem('usuario');

    this.obtenerPartidosJugador();

  }

  obtenerPartidosJugador(){
    this.jugadores.obtenerPartidosJugador(this.usuario).subscribe({
      next: (data: any) => {
        this.partidos = data;
        console.log(this.partidos);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}

