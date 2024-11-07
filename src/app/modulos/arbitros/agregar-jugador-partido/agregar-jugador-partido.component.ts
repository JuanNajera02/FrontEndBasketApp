import { Component,Input } from '@angular/core';
import { JugadoresDePartidoEquipoService } from '../../arbitros/servicios/jugadores-de-partido-equipo.service';

@Component({
  selector: 'app-agregar-jugador-partido',
  templateUrl: './agregar-jugador-partido.component.html',
  styleUrls: ['./agregar-jugador-partido.component.css']
})
export class AgregarJugadorPartidoComponent {
  @Input() claveDelPartido: number | undefined;
  @Input() nombreEquipo: string | undefined;

  constructor(private jugadorPartidoServ: JugadoresDePartidoEquipoService) { }

  agregarJugadorAPartido(){
    console.log(this.claveDelPartido);
    console.log(this.nombreEquipo);
  }

}
