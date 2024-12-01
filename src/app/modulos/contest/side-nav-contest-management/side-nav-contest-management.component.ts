import { Referee, Team } from "./../../admin-ligas/temporada-caracteriticas/interfaces";
import { TemporadasService } from "./../../admin-ligas/adminLigasService/temporadas.service";
import { AgregarEquipoComponent } from "./../../admin-ligas/agregar-equipo/agregar-equipo.component";
import { AsignarArbitroComponent } from "./../../admin-ligas/asignar-arbitro/asignar-arbitro.component";
import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-side-nav-contest-management",
  templateUrl: "./side-nav-contest-management.component.html",
  styleUrls: ["./side-nav-contest-management.component.css"]
})
export class SideNavContestManagementComponent {
  constructor(public dialog: MatDialog, public tempService: TemporadasService) { }

  @Input() teams: Team[] = [];
  @Input() referees: Referee[] = [];
  @Input() seasonId: number = 0;
  @Input() organizers: string[] = [];

  addTeam($event: Event): void {
    this.dialog.open(AgregarEquipoComponent, {
      width: "250px",
    });
    $event.stopPropagation();
  }

  removeTeam($event: Event, seasonId: number, teamToRemove: string) {
    // eliminarEquipoTemp(idTemporada: number, nombreEquipo: string) {
    this.tempService.eliminarEquipoDeTemporada(seasonId, teamToRemove).subscribe({
      next: () => {
        this.teams = this.teams.filter(team => team.nombreEquipo !== teamToRemove);
      },
      error: (e) => {
        alert(e);
      }
    });
    $event.stopPropagation();
  }

  addReferee($event: Event) {
    this.dialog.open(AsignarArbitroComponent, {
      width: "250px",
    });
    $event.stopPropagation();
  }

  removeReferee($event: Event, seasonId: number, username: string) {
    this.tempService.eliminarArbitroDeTemporada(seasonId, username).subscribe({
      next: () => {
        this.tempService.emitNuevoArbitroAsignado();
      },
      error: (e) => {
        alert(e);
      }
    });
    $event.stopPropagation();
  }

}
