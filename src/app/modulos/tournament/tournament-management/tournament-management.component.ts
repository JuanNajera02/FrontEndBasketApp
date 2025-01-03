import { Component, OnInit } from "@angular/core";
import { TemporadasService } from "../../admin-ligas/adminLigasService/temporadas.service";
import { LigasServiceService } from "../../admin-ligas/adminLigasService/ligas-service.service";
import { Referee, Team } from "../../admin-ligas/temporada-caracteriticas/interfaces";
import { ActivatedRoute } from "@angular/router";
import { TournamentService } from "../tournament.service";
import { emptyTournament, Tournament, User } from "../interface";

@Component({
  selector: "app-tournament-management",
  templateUrl: "./tournament-management.component.html",
  styleUrls: ["./tournament-management.component.css"]
})
export class TournamentManagementComponent implements OnInit {

  constructor(
    private tempService: TemporadasService,
    private route: ActivatedRoute
  ) { }

  // PUBLIC
  public teams: Team[] = [];
  public referees: Referee[] = [];
  public organizers: string[] = [];
  public tournament: Tournament = emptyTournament;
  // PRIVATE

  ngOnInit(): void {
    this.tournament = this.route.snapshot.data["tournamentData"];
    this.updateTournamentUI(this.tournament);
  }

  updateTournamentUI(tournament: Tournament) {
    this.organizers = this.filterOrganizers(tournament);
    this.referees = this.filterReferees(tournament);
  }

  filterOrganizers(tournament: Tournament): string[] {
    return tournament.users.filter(user => user.role === "ORGANIZER").map(user => user.name + " " + user.lastName);
  }

  filterReferees(tournament: Tournament): Referee[] {
    return tournament.users.filter(user => user.role === "REFEREE").map((user: User) => user as Referee);
  }

  // getTeams(seasonId: number) {
  //   this.tempService.obtenerEquiposTemporada(seasonId).subscribe({
  //     next: (teams) => {
  //       this.teams = Object.keys(teams).map(key => ({ nombreEquipo: key, equipo: teams[key] }));
  //     }
  //   });
  // }

  // getReferees(seasonId: number) {
  //   this.tempService.obtenerArbitros(seasonId).subscribe({
  //     next: (referees) => {
  //       this.referees = referees;
  //     }
  //   });
  // }

  setListeners() {
    // this.tempService.onNuevoEquipoAsignado().subscribe(() => {
    //   this.getTeams(this.tournamentId);
    // });

    // this.tempService.onNuevoArbitroAsignado().subscribe(() => {
    //   this.getReferees(this.tournamentId);
    // });
  }

}
