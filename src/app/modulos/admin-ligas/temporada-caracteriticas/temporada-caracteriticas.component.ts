import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TemporadasService } from "../adminLigasService/temporadas.service";
import { ActivatedRoute } from "@angular/router";
import { AsignarArbitroComponent } from "../asignar-arbitro/asignar-arbitro.component";
import { Equipos } from "../interfaces/Equipos";
import { AgregarEquipoComponent } from "../agregar-equipo/agregar-equipo.component";
import { Partidos } from "../interfaces/Partidos";
import { AgregarArbitroPartidoComponent } from "../agregar-arbitro-partido/agregar-arbitro-partido.component";
import { AgregarFechaPartidoComponent } from "../agregar-fecha-partido/agregar-fecha-partido.component";
import { CaracteristicasPartidosComponent } from "../caracteristicas-partidos/caracteristicas-partidos.component";
import { Referee } from "./interfaces";
import { LigasServiceService } from "../adminLigasService/ligas-service.service";

@Component({
  selector: "app-temporada-caracteriticas",
  templateUrl: "./temporada-caracteriticas.component.html",
  styleUrls: ["./temporada-caracteriticas.component.css"]
})
export class TemporadaCaracteriticasComponent implements OnInit{

  constructor(public dialog: MatDialog, private tempService: TemporadasService, private router: Router, private route: ActivatedRoute,private ligaService: LigasServiceService) { }

  idTemporada: number = 0;
  organizers: any = [];
  arbitrosTemp: Referee[] = [];
  equiposTemp: Equipos[] = [];
  equiposTempList: any[] = []; // Declaración e inicialización
  cantidadEquipos: number = 0;
  mensajeEquipos: string = "No hay equipos Asignados";
  mensajeArbitros: string = "No hay arbitros Asignados";
  estadoTemporada: string = "";
  mensajePartidos: string = "";
  partidosTemporada: Partidos[] = [];
  idPartido: number = 0;
  displayedColumns: string[] = ["equipo1", "arbitro", "equipo2","fase", "fechaInicio", "ganador"];
  equiposTemporada: number = 0;
  enfrentaminetosEquipos: number = 0;
  equiposPlayoff: number = 0;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idTemporada = +params["idTemporada"];
      localStorage.setItem("idTemporada", this.idTemporada.toString());
      this.obtenerArbitrosTemp(this.idTemporada);
      this.obtenerEquiposTemp(this.idTemporada);
      const idLiga: number = +params["idLiga"];
      console.log("idliga",idLiga);
      this.obtenerAdminsLiga(idLiga);
    });
    this.obtenerCaracteristicasTemporada();
   this.tempService.onCaracteristicasTemporadaActualizadas().subscribe({
    next: () => {
      this.obtenerCaracteristicasTemporada();
    }
    });

    this.tempService.onNuevaTemporadaCreada().subscribe({
      next: () => {
        this.obtenerArbitrosTemp(this.idTemporada);
      }
    });

    this.tempService.onNuevoArbitroAsignado().subscribe({
      next: () => {
        this.obtenerArbitrosTemp(this.idTemporada);
      }
    });

    this.tempService.onNuevoEquipoAsignado().subscribe({
      next: () => {
        this.obtenerEquiposTemp(this.idTemporada);
      }
    });

    this.obtenerEstadoTemporada(this.idTemporada);

    this.tempService.onEstadoTemporadaActualizado().subscribe({
      next: () => {
        this.obtenerEstadoTemporada(this.idTemporada);
      }
    });

    this.obtenerPartidosTemporada();
    setTimeout(() => {
      this.mensajePartidos = ""; // Limpiar el mensaje
    }, 5000);
    this.tempService.onNuevoArbitroPartidoAsignado().subscribe({
      next: () => {
        this.obtenerPartidosTemporada();
      }
    });

    this.tempService.onNuevaFechaPartidoAsignada().subscribe({
      next: () => {
        this.obtenerPartidosTemporada();
      }
    });

    this.tempService.onNuevosPartidosGenerados().subscribe({
      next: () => {
        this.obtenerPartidosTemporada();
        setTimeout(() => {
          this.mensajePartidos = ""; // Limpiar el mensaje
        }, 5000);
      }
    });

  }

  obtenerAdminsLiga(idLiga: number) {
    this.ligaService.obtenerAdminsDeLiga(idLiga).subscribe({
      next: (organizers) => {
        this.organizers = organizers;
        
      }
    });
  }

  obtenerArbitrosTemp(idTemporada: number) {
    this.tempService.obtenerArbitros(idTemporada).subscribe({
      next: (data) => {
        this.arbitrosTemp = data;
      }
    });
  }

  obtenerEquiposTemp(idTemporada: number) {
    this.tempService.obtenerEquiposTemporada(idTemporada).subscribe({
      next: (data) => {
        
        this.equiposTemp = data;
        this.equiposTempList = Object.keys(data).map(key => ({ nombreEquipo: key, equipo: data[key] }));
        console.log(this.equiposTempList);
        
        this.cantidadEquipos = this.equiposTempList.length;
        if (this.cantidadEquipos === this.equiposTemporada)
            this.dialog.closeAll();
            console.log(this.equiposTempList.length);
      }
    });
  }

  openDialogEquipos(): void {
    this.dialog.open(AgregarEquipoComponent,{
      width: "250px",
    });
  }

  obtenerEstadoTemporada(idTemporada: number) {
    this.tempService.obtenerEstadoTemporada(idTemporada).subscribe({
      next: (result) => {
        this.estadoTemporada = result.estado;
      }
    });

  }

  generarPartidos(idTemporada: number) {

    if(this.partidosTemporada.length > 0){
      this.tempService.crearPartidosEliminatorias(idTemporada).subscribe({
        next: (result) => {
          this.mensajePartidos = "Partidos Generados Exitosamente";
          this.tempService.emitNuevosPartidosGenerados();
          setTimeout(() => {
            this.mensajePartidos = ""; // Limpiar el mensaje
          }, 5000);
        },
        error: (err) => {
          this.mensajePartidos = err.error[0].message;
          setTimeout(() => {
            this.mensajePartidos = ""; // Limpiar el mensaje
          }, 5000);
        }
      });
    }else if (this.partidosTemporada.length <= 0){
      console.log(this.partidosTemporada.length);
      console.log(idTemporada);
      console.log(this.enfrentaminetosEquipos);
      this.tempService.crearPartidosTemporadaRegular(idTemporada, this.enfrentaminetosEquipos).subscribe({
        next: (result) => {
          this.mensajePartidos = "Partidos Generados Exitosamente";
          this.tempService.emitEstadoTemporadaActualizado();
          this.tempService.emitNuevosPartidosGenerados();
          setTimeout(() => {
            this.mensajePartidos = ""; // Limpiar el mensaje
          }, 5000);
        },
        error: (err) => {
          this.mensajePartidos = err.error[0].message;
          setTimeout(() => {
            this.mensajePartidos = ""; // Limpiar el mensaje
          }, 5000);
        }
      });
    }

  }

  obtenerPartidosTemporada() {
    this.tempService.obtenerPartidosTemporada(this.idTemporada).subscribe({
      next: (result) => {
        this.partidosTemporada = result;
      }
    });
  }

  agregarArbitroPartido(idPartido: number): void {
    localStorage.setItem("idPartido", idPartido.toString());
    this.dialog.open(AgregarArbitroPartidoComponent,{
      width: "250px",
    });
  }

  agregarFechaPartido(idPartido: number): void {
    localStorage.setItem("idPartido", idPartido.toString());
    this.dialog.open(AgregarFechaPartidoComponent,{
      width: "250px",
    });
  }

  openDialogPartidosCaract(): void {
    localStorage.setItem("idTemporada", this.idTemporada.toString());
    this.dialog.open(CaracteristicasPartidosComponent,{
      width: "450px",
    });
  }

  obtenerCaracteristicasTemporada(){
    this.tempService.obtenerCaracteristicasTemporada(this.idTemporada).subscribe({
      next: (data: any) => {
        console.log(data);
        this.equiposTemporada = data.cantidadEquipos;
        this.enfrentaminetosEquipos = data.cantidadEnfrentamientosRegular;
        this.equiposPlayoff = data.cantidadPlayoffs;

      }
    });
  }

}

