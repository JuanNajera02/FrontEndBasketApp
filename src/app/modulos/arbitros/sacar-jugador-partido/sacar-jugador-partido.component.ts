import { Component, Input } from '@angular/core';
import { RxStompService } from '../config-rx-stomp/rx-stomp.service';

@Component({
  selector: 'app-sacar-jugador-partido',
  templateUrl: './sacar-jugador-partido.component.html',
  styleUrls: ['./sacar-jugador-partido.component.css']
})

export class SacarJugadorPartidoComponent   {
  @Input() claveDelPartido: number | undefined;
  @Input() nombreEquipo: string | undefined;
  @Input() jugador: string | undefined;

  constructor(private RxStompService: RxStompService) { }

  sacarJugador(){
    const message  = {
      clavePartido: this.claveDelPartido,
      jugador: this.jugador,
      nombreEquipo: this.nombreEquipo
    }
    this.RxStompService.publish({
      destination: `/app/sacarJugador/${this.claveDelPartido}`,
      body: JSON.stringify(message)
    });
  }

}
