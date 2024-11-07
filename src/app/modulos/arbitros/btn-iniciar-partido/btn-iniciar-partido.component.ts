import { Component, Input } from '@angular/core';
import { PartidosService } from 'src/app/services/partidosService/partidos.service';

@Component({
  selector: 'app-btn-iniciar-partido',
  templateUrl: './btn-iniciar-partido.component.html',
  styleUrls: ['./btn-iniciar-partido.component.css']
})
export class BtnIniciarPartidoComponent {

  @Input() clavePartido: number | undefined;

  constructor(private partidoServ: PartidosService) { }

  iniciarPartidoArbitro() {
    this.partidoServ.arbitroIniciaPartidoFecha(this.clavePartido).subscribe();
    window.location.reload();
  }

}
