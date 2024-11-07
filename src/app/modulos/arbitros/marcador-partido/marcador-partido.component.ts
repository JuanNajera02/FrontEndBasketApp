import { Component, Input, OnInit } from '@angular/core';
import { JugadoresDePartidoEquipoService } from '../servicios/jugadores-de-partido-equipo.service';
import { MarcadorService } from '../servicios/marcador.service';
@Component({
  selector: 'app-marcador-partido',
  templateUrl: './marcador-partido.component.html',
  styleUrls: ['./marcador-partido.component.css']
})
export class MarcadorPartidoComponent implements OnInit {
  @Input() nombreEquipo1: string | undefined;
  puntosEquipo1: number | undefined;

  @Input() nombreEquipo2: string | undefined;
  puntosEquipo2: number | undefined;
  
  @Input() claveDelPartido: number | undefined;
  
  constructor(private jugPartido: JugadoresDePartidoEquipoService, private marcadorServ: MarcadorService) { }
  ngOnInit(): void {
    this.jugPartido.obtenerPuntosEquipo(this.nombreEquipo1,this.claveDelPartido).subscribe((req)=>{
      this.puntosEquipo1=req.puntos;
    this.marcadorServ.actualizarPuntosEquipo(this.nombreEquipo1,this.claveDelPartido,this.puntosEquipo1);
      this.marcadorServ.getPuntosEquipo(this.nombreEquipo1,this.claveDelPartido).subscribe((puntos)=>{
        this.puntosEquipo1=puntos;
        console.log("puntos equipo 1: "+this.puntosEquipo1);
      });
    });
    this.jugPartido.obtenerPuntosEquipo(this.nombreEquipo2,this.claveDelPartido).subscribe((req)=>{
      this.puntosEquipo2=req.puntos;
      this.marcadorServ.actualizarPuntosEquipo(this.nombreEquipo2,this.claveDelPartido,this.puntosEquipo2);
      this.marcadorServ.getPuntosEquipo(this.nombreEquipo2,this.claveDelPartido).subscribe((puntos)=>{
        this.puntosEquipo2=puntos;
        console.log("puntos equipo 2: "+this.puntosEquipo2);
      });

    });
   
  }

}
