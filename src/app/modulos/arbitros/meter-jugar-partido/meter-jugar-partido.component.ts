import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EquiposService } from '../../admin-equipos/EquiposService/equipos.service';
import { EstadisticasJugador } from '../interfaces/EstadisticasJugador';
import { RxStompService } from '../config-rx-stomp/rx-stomp.service';

@Component({
  selector: 'app-meter-jugar-partido',
  templateUrl: './meter-jugar-partido.component.html',
  styleUrls: ['./meter-jugar-partido.component.css']
})
export class MeterJugarPartidoComponent {
  clavePartido: string = "";
  nombreEquipo: string  = "";
  jugadoresEnBanca: EstadisticasJugador[] = [];
  selectedJugador: EstadisticasJugador | undefined;
  mensajeError: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private equipoServ: EquiposService,private RxStompService: RxStompService,
  public dialogRef: MatDialogRef<MeterJugarPartidoComponent>

  ){}

  ngOnInit(): void {
    this.clavePartido = this.data.clavePartido;
    this.nombreEquipo = this.data.nombreEquipo;
    this.obtenerJugadores();

  }
  obtenerJugadores(){
    this.equipoServ.obtenerJugadoresDePartidoEnBanca(this.nombreEquipo,this.clavePartido,true).subscribe((data: any)=>{
      this.jugadoresEnBanca = data;
    });
  }

  agregarJugador(){
    if(this.selectedJugador == undefined){
      this.mensajeError = "Selecciona un jugador";
      return;
    }
    if(this.selectedJugador.faltas >= 5){
      this.mensajeError = "El jugador tiene 5 faltas no puede entrar al partido";
      return;
    }

    const message  = {
      clavePartido: this.clavePartido,
      ...this.selectedJugador,
      nombreEquipo: this.nombreEquipo
    }
    console.log(message)
    this.RxStompService.publish({
      destination: `/app/meterJugador/${this.clavePartido}`,
      body: JSON.stringify(message)
    });
    this.dialogRef.close();
  }

}
