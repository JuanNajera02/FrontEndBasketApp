import { Component, OnInit,Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EstadisticasJugador } from '../interfaces/EstadisticasJugador';
import { JugadoresDePartidoEquipoService } from '../servicios/jugadores-de-partido-equipo.service';
import { RxStompService } from '../config-rx-stomp/rx-stomp.service';
import {Message} from '@stomp/stompjs';
import { SacarJugador } from '../interfaces/SacarJugador';
import { MatDialog } from '@angular/material/dialog';
import { MeterJugarPartidoComponent } from '../meter-jugar-partido/meter-jugar-partido.component';
import { MarcadorService } from '../servicios/marcador.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tabla-estadisticas-de-jugador-por-partido',
  templateUrl: './tabla-estadisticas-de-jugador-por-partido.component.html',
  styleUrls: ['./tabla-estadisticas-de-jugador-por-partido.component.css']
})
export class TablaEstadisticasDeJugadorPorPartidoComponent implements OnInit {

    @Input() nombreEquipo: string | undefined;
    @Input() claveDelPartido: number | undefined;
    @Input() enBanca: number | null;
    @Input() partidoFinalizado: boolean = false;
    @Input() usuarioArbitroAsignado: string = "";
    private puntosEquipo: number | undefined;

    statDescriptionHandlersPositivos: { [key: string]: (fila: EstadisticasJugador)=> void } = {
      tirosDe2Puntos: (fila: EstadisticasJugador) => fila.tirosDe2Puntos++,
      tirosLibres: (fila: EstadisticasJugador) => fila.tirosLibres++,
      tirosDe3Puntos: (fila: EstadisticasJugador) => fila.tirosDe3Puntos++,
      asistencias: (fila: EstadisticasJugador) => fila.asistencias++,
      faltas: (fila: EstadisticasJugador) => fila.faltas++,
    };
    statDescriptionHandlersNegativos: { [key: string]: (fila: EstadisticasJugador)=> void } = {
      tirosDe2Puntos: (fila: EstadisticasJugador) => fila.tirosDe2Puntos--,
      tirosLibres: (fila: EstadisticasJugador) => fila.tirosLibres--,
      tirosDe3Puntos: (fila: EstadisticasJugador) => fila.tirosDe3Puntos--,
      asistencias: (fila: EstadisticasJugador) => fila.asistencias--,
      faltas: (fila: EstadisticasJugador) => fila.faltas--,
    };

    jugadorBase = {
      jugador: '',
      faltas: 0,
      tirosDe2Puntos: 0,
      tirosDe3Puntos: 0,
      tirosLibres: 0,
      asistencias: 0,
    };
    datosTemporales: EstadisticasJugador[] = []
    usuario: any = '';
    rol: any = '';

    data: EstadisticasJugador[] = [];

    displayedColumns: string[] = ['jugador', 'faltas', 'tirosDe2Puntos','tirosLibres', 'tirosDe3Puntos', 'asistencias'];
    tableDataSource: MatTableDataSource<EstadisticasJugador>;

    constructor(private JugadoresDePartidoEquipoService: JugadoresDePartidoEquipoService,private RxStompService: RxStompService
      ,public dialog: MatDialog,private marcadorServ: MarcadorService ) {
      this.tableDataSource = new MatTableDataSource<EstadisticasJugador>();
      this.enBanca = null;
    }

    ngOnDestroy() {
      this.RxStompService.deactivate();
    }
    
    agregarPuntoDeJugador(jugador: string, columna: string) {

      const message = {
        "clavePartido": this.claveDelPartido,
        "jugador" : jugador,
        "descripcion" : columna,
        "puntoPositivo": true
      }
      this.RxStompService.publish({
        destination: `/app/actualizarPunto/${this.claveDelPartido}`,
        body: JSON.stringify(message)
      });

    }
    quitarPuntoDeJugador(jugador: string, columna: string) {

        const message = {
          "clavePartido": this.claveDelPartido,
          "jugador" : jugador,
          "descripcion" : columna,
          "puntoPositivo": false
        }
        this.RxStompService.publish({
          destination: `/app/actualizarPunto/${this.claveDelPartido}`,
          body: JSON.stringify(message)
        });
    }

    ngOnInit() {
      this.JugadoresDePartidoEquipoService.obtenerJugadoresDePartidoYEquipo(this.claveDelPartido, this.nombreEquipo).subscribe((data) => {

        data = data.filter((fila) => fila.faltas < 5);

        // Ordenar por nombre de jugador
        data.sort((a, b) => a.jugador.localeCompare(b.jugador));

        // Filtrar jugadores base
        this.datosTemporales = data.filter((fila) => fila.jugador === '');

        // Quitar jugadores duplicados
        const jugadores: string[] = [];
        data = data.filter((fila) => {
          if (!jugadores.includes(fila.jugador)) {
            jugadores.push(fila.jugador);
            return true;
          }
          return false;
        });

        this.tableDataSource = new MatTableDataSource<EstadisticasJugador>([...data, ...this.datosTemporales]);

      });

      this.onSacarJugador();
      this.onMeterJugadorPartido();
      this.onActualizacionesDePuntos();
      this.marcadorServ.getPuntosEquipo(this.nombreEquipo,this.claveDelPartido).subscribe((puntos)=>{
        this.puntosEquipo=puntos;
      });
      this.usuario = localStorage.getItem('usuario');
      this.JugadoresDePartidoEquipoService.obtenerTipoUsuario(this.usuario).subscribe((data: any) => {
        this.rol = data.Rol;
      });

  }
  onActualizacionesDePuntos(){
    this.RxStompService.watch(`/topic/ActualizacionesDePuntos/${this.claveDelPartido}`).subscribe((message: Message) => {
      const response = JSON.parse(message.body);

    this.tableDataSource.data.forEach((fila: EstadisticasJugador) => {
        if (fila.jugador === response.jugador && response.descripcion in this.statDescriptionHandlersPositivos) {
          if(response.puntoPositivo)this.statDescriptionHandlersPositivos[response.descripcion](fila);
          else this.statDescriptionHandlersNegativos[response.descripcion](fila);
          if(response.descripcion === 'faltas' && fila.faltas === 5){
            this.RxStompService.publish({
              destination: `/app/sacarJugador/${this.claveDelPartido}`,
              body: JSON.stringify({
                "clavePartido": this.claveDelPartido,
                "jugador" : fila.jugador,
                "nombreEquipo": this.nombreEquipo
              })
            });
          }

          if(response.descripcion === 'tirosDe2Puntos' || response.descripcion === 'tirosDe3Puntos' || response.descripcion === 'tirosLibres'){
            let puntosActualizar = 0
            if(response.puntoPositivo){
              if(response.descripcion === 'tirosDe2Puntos') puntosActualizar = 2;
              if(response.descripcion === 'tirosDe3Puntos') puntosActualizar = 3;
              if(response.descripcion === 'tirosLibres') puntosActualizar = 1;
            }else{
              if(response.descripcion === 'tirosDe2Puntos') puntosActualizar = -2;
              if(response.descripcion === 'tirosDe3Puntos') puntosActualizar = -3;
              if(response.descripcion === 'tirosLibres') puntosActualizar = -1;
            }
            this.marcadorServ.actualizarPuntosEquipo(this.nombreEquipo, this.claveDelPartido, this.puntosEquipo && this.puntosEquipo + puntosActualizar);
          }
        }

      });

    })
  }
  onSacarJugador(){
    this.RxStompService.watch(`/topic/sacarJugador/${this.claveDelPartido}`).subscribe((message: Message) => {
      const sacarJugadorResponse: SacarJugador | undefined = JSON.parse(message.body);
      const newData = [...this.tableDataSource.data];
      let jugadorEncontrado = false;

      for (let i = 0; i < newData.length; i++) {
        if(this.nombreEquipo !== sacarJugadorResponse?.nombreEquipo){
          jugadorEncontrado = false;
          break;
        }
        if (newData[i].jugador === sacarJugadorResponse?.jugador ) {
          jugadorEncontrado = true;
          newData.splice(i, 1);
          break;
        }
      }
      if(jugadorEncontrado){
        newData.push(this.jugadorBase);
        this.tableDataSource.data = newData;
      }

   });

  }
  onMeterJugadorPartido(){
    this.RxStompService.watch(`/topic/meterJugador/${this.claveDelPartido}`).subscribe((message: Message) => {
      const newData = [...this.tableDataSource.data];
      console.log(message.body)
      const nombreEquipo = JSON.parse(message.body).nombreEquipo;

      if(nombreEquipo !== this.nombreEquipo) return;
      const newJugador: EstadisticasJugador ={
        jugador: JSON.parse(message.body).jugador,
        faltas: JSON.parse(message.body).faltas,
        tirosDe2Puntos: JSON.parse(message.body).tirosDe2Puntos,
        tirosDe3Puntos: JSON.parse(message.body).tirosDe3Puntos,
        tirosLibres: JSON.parse(message.body).tirosLibres,
        asistencias: JSON.parse(message.body).asistencias,
      }
      newData.push(newJugador);
      // sort by name but blanks last
      newData.sort((a, b) => {
        if (a.jugador === '') {
          return 1;
        }
        if (b.jugador === '') {
          return -1;
        }
        return a.jugador.localeCompare(b.jugador);
      });
      newData.splice(newData.findIndex((fila) => fila.jugador === ''), 1);
      this.tableDataSource.data = newData;
    });
  }

  meterJugadorPartido(){
    this.dialog.open(MeterJugarPartidoComponent,{
      width: '450px',
      data: {
        clavePartido: this.claveDelPartido,
        nombreEquipo: this.nombreEquipo
      }
    })
  }

}

