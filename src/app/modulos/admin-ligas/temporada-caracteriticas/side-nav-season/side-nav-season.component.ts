import { Component, Input, OnInit } from "@angular/core";
import { Referee, Team } from "../interfaces";
import { AgregarEquipoComponent } from "../../agregar-equipo/agregar-equipo.component";
import { MatDialog } from "@angular/material/dialog";
import { TemporadasService } from "../../adminLigasService/temporadas.service";
import { AsignarArbitroComponent } from "../../asignar-arbitro/asignar-arbitro.component";

@Component({
  selector: "app-side-nav-season",
  templateUrl: "./side-nav-season.component.html",
  styleUrls: ["./side-nav-season.component.css"]
})
export class SideNavSeasonComponent implements OnInit {

  constructor(public dialog: MatDialog,public tempService: TemporadasService) { }

  @Input() teams: Team[] = [];
  @Input() referees: Referee[] = [];
  @Input() seasonId: number = 0;
  @Input() organizers: string[] = [];

  ngOnInit(): void {
    console.log("referees sidenav",this.referees);

  }

  addTeam($event: any): void {
    this.dialog.open(AgregarEquipoComponent, {
      width: "250px",
    });
    $event.stopPropagation();
  }

  removeTeam($event: any,seasonId: number,teamName: string) {
    // eliminarEquipoTemp(idTemporada: number, nombreEquipo: string) {
      this.tempService.eliminarEquipoDeTemporada(seasonId, teamName).subscribe({
        next: () => {
          this.tempService.emitNuevoEquipoAsignado();
        },
        error:(e) => {
          alert(e);
        }
      });
    $event.stopPropagation();
  }

  addReferee($event: any){
    this.dialog.open(AsignarArbitroComponent,{
      width: "250px",
    });
    $event.stopPropagation();
  }
  
  removeReferee($event: any,seasonId: number,username: string){
    this.tempService.eliminarArbitroDeTemporada(seasonId, username).subscribe({
      next: () => {
        this.tempService.emitNuevoArbitroAsignado();
      },
      error: (e) => {
        alert(e);
      }
    });
  }

}
