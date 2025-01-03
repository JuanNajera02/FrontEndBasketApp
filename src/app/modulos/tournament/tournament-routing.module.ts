import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateTournamentComponent } from "./create-tournament/create-tournament.component";
import { TemporadaCaracteriticasComponent } from "../admin-ligas/temporada-caracteriticas/temporada-caracteriticas.component";
import { TournamentManagementComponent } from "./tournament-management/tournament-management.component";
import { tournamentResolver } from "./resolvers/tournament.resolver";

const routes: Routes = [
  { path: "", component: CreateTournamentComponent },
  {
    path: ":tournamentId",
    component: TournamentManagementComponent,
    resolve: {
      tournamentData: tournamentResolver
    },
    children: [
      { path: "overview", component: CreateTournamentComponent },
      { path: "matches", component: TemporadaCaracteriticasComponent },
      { path: "", redirectTo: "overview", pathMatch: "full" }
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class TournamentRoutingModule { }
