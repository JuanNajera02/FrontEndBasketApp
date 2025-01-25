import { NgModule } from "@angular/core";
import { RouterModule, Routes, withComponentInputBinding } from "@angular/router";
import { CreateTournamentComponent } from "./create-tournament/create-tournament.component";
import { TemporadaCaracteriticasComponent } from "../admin-ligas/temporada-caracteriticas/temporada-caracteriticas.component";
import { TournamentManagementComponent } from "./tournament-management/tournament-management.component";
import { tournamentResolver } from "./resolvers/tournament.resolver";
import { TeamPlayersComponent } from "../teams/team-players/team-players.component";
import { AddPlayerTokenGuard } from "src/app/guards/add-player-token.guard";
import { ErrorMessageComponent } from "src/app/shared/error-message/error-message.component";

const routes: Routes = [
  { path: "", component: CreateTournamentComponent },
  {
    path: ":tournamentId",
    component: TournamentManagementComponent,
    resolve: {
      tournament: tournamentResolver
    },
    children: [
      { path: "overview", component: CreateTournamentComponent },
      { path: "matches", component: TemporadaCaracteriticasComponent },
      {path : "team/:teamId/:token", component: TeamPlayersComponent, canActivate: [AddPlayerTokenGuard] },
      {path : "team/:teamId", component: TeamPlayersComponent},
      {path: "invalid", component:ErrorMessageComponent},
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
