import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns-tz';
import { concat, partition } from 'rxjs';
import { PartidosService } from 'src/app/services/partidosService/partidos.service';
import { catchError, of } from 'rxjs';
import { JugadoresDePartidoEquipoService } from '../servicios/jugadores-de-partido-equipo.service';
@Component({
  selector: 'app-registro-de-estadisticas-de-jugadores-por-partido',
  templateUrl: './registro-de-estadisticas-de-jugadores-por-partido.component.html',
  styleUrls: ['./registro-de-estadisticas-de-jugadores-por-partido.component.css']
})
export class RegistroDeEstadisticasDeJugadoresPorPartidoComponent implements OnInit {
  claveDelPartido: number | undefined;
  nombreEquipo1 = "";
  nombreEquipo2 = "";
  fechaInicioPartido: any ;
  fechaIniciPartidoArbitro: any = null;
  tiempoTranscurrido: string = "00:00:00";
  partidoFinalizado: boolean = false;
  mensajeTiempos: string = "Tiempo 1";
  usuarioArbitroAsignado = ""; // esta variable nos dice cual es el usuario del arbitro que esta asignado al partido
  rol: string = "";
  usuario: any;
  aribitroPuedeIniciarPartido = false; // esta varibale nos dice cuando va a poder iniciar el partido el arbitro media hora antes y media hora despues de la hora de inicio
  tiempoDetenido = false;
  constructor(private route: ActivatedRoute,private PartidoService: PartidosService,private jugadorPartidoServ: JugadoresDePartidoEquipoService) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => this.claveDelPartido = params['claveDelPartido']);
    this.usuario = localStorage.getItem('usuario');

    this.PartidoService.obtenerUsuarioArbitroAsignado(this.claveDelPartido).subscribe((data: any) => {
      this.usuarioArbitroAsignado = data.usuarioArbitro;
    });

    this.jugadorPartidoServ.obtenerTipoUsuario(this.usuario).subscribe((data: any) => {
      this.rol = data.Rol;
    });

    this.obtenerEquiposDePartido();
      this.PartidoService.obtenerGanador(this.claveDelPartido).subscribe((data: any) => {
        if(data.ganador.length !== 0){
          this.partidoFinalizado = true;
          this.tiempoTranscurrido = "El partido ha finalizado";
          return;
        }
        this.PartidoService.obtenerFecharArbitroIniciaPartido(this.claveDelPartido).subscribe((data: any) => {
          if(data.fechaInicio !== null){
            this.fechaIniciPartidoArbitro = data.fechaInicio;
            this.aribitroPuedeIniciarPartido = false;
            const fechaInicio = new Date(this.fechaIniciPartidoArbitro);
            let fechaActual = new Date();
            if(fechaInicio.getTime() > fechaActual.getTime()){
            this.partidoFinalizado = false;
            this.tiempoTranscurrido = "El partido no ha iniciado";
            return;
            }else{
              fechaActual = new Date();
              let tiempoTranscurrido = fechaActual.getTime() - fechaInicio.getTime();
              setInterval(() => {
                if(this.tiempoDetenido === true)return;
                const segundosTranscurridos = Math.floor(tiempoTranscurrido / 1000);
                const horas = Math.floor(segundosTranscurridos / 3600);
                let minutos: any = Math.floor((segundosTranscurridos % 3600) / 60);
                let segundos: any = segundosTranscurridos % 60;
                if(minutos < 10 && horas < 1){
                  this.mensajeTiempos = "Tiempo 1";
                }else if(minutos < 20 && horas < 1){
                  this.mensajeTiempos = "Tiempo 2";
                }
                else if(minutos < 30 && horas < 1){
                  this.mensajeTiempos = "Tiempo 3";
                }
                else if(minutos < 40 && horas < 1){
                  this.mensajeTiempos = "Tiempo 4";
                }else{
                  this.mensajeTiempos = "Tiempo extra";
                }
                if (segundos < 10) {
                  segundos = "0" + segundos;
              }
              if (minutos < 10) {
                  minutos = "0" + minutos;
                }
          
                this.tiempoTranscurrido = `${horas}:${minutos}:${segundos}`;
                tiempoTranscurrido += 1000;

              }, 1000);
            }
          }
        });
        this.PartidoService.obtenerFechaInicio(this.claveDelPartido).subscribe((data: any) => {
          if(this.fechaIniciPartidoArbitro !== null)return;

          this.fechaInicioPartido = data.fechaInicio;
          const fechaInicio = new Date(this.fechaInicioPartido);
          const fechaActual = new Date();
          
          // checa si la hora actual esta entre 30 minutos antes y 30 minutos despues de la hora de inicio del partido
          if(fechaActual.getTime() > fechaInicio.getTime() - 1800000 && fechaActual.getTime() < fechaInicio.getTime() + 1800000){
            this.aribitroPuedeIniciarPartido = true;
          }else{
            this.aribitroPuedeIniciarPartido = false;
          }
          
        });
      })
       
  }

  detenerTiempo(){
    this.tiempoDetenido = !this.tiempoDetenido;
  }
  obtenerEquiposDePartido(){

    this.PartidoService.obtenerPartido(this.claveDelPartido).subscribe((partido)=>{
      this.nombreEquipo1=partido.equipo1;
      this.nombreEquipo2=partido.equipo2;
      
    });

  }

}
