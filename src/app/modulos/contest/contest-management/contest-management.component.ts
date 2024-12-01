import { Component, OnInit } from "@angular/core";
import { TemporadasService } from "../../admin-ligas/adminLigasService/temporadas.service";
import { LigasServiceService } from "../../admin-ligas/adminLigasService/ligas-service.service";
import { Referee, Team } from "../../admin-ligas/temporada-caracteriticas/interfaces";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-contest-management",
  templateUrl: "./contest-management.component.html",
  styleUrls: ["./contest-management.component.css"]
})
export class ContestManagementComponent implements OnInit {
  constructor(private tempService: TemporadasService, private ligaService: LigasServiceService, private route: ActivatedRoute) { }
  // PUBLIC
  public teams: Team[] = [];
  public referees: Referee[] = [];
  public organizers: any[] = [];
  public seasonId: number = 0;
  // PRIVATE
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.seasonId = +params["idTemporada"];
      localStorage.setItem("idTemporada", this.seasonId.toString());
      this.getReferees(this.seasonId);
      this.getTeams(this.seasonId);
      // const idLiga: number = +params["idLiga"];
      // console.log("idliga", idLiga);
      // this.obtenerAdminsLiga(idLiga);
      this.setListeners();
    });
  }

  // getOrganizers() { }

  getTeams(seasonId: number) {
    this.tempService.obtenerEquiposTemporada(seasonId).subscribe({
      next: (teams) => {
        this.teams = Object.keys(teams).map(key => ({ nombreEquipo: key, equipo: teams[key] }));
      }
    });
  }

  getReferees(seasonId: number) {
    this.tempService.obtenerArbitros(seasonId).subscribe({
      next: (data) => {
        this.referees = data;
      }
    });
  }

  setListeners() {
    this.tempService.onNuevoEquipoAsignado().subscribe(() => {
      this.getTeams(this.seasonId);
    });
    this.tempService.onNuevoArbitroAsignado().subscribe(() => {
      this.getReferees(this.seasonId)
    })
  }

}
