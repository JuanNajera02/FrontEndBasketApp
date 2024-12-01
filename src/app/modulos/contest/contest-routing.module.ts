import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateContestComponent } from "./create-contest/create-contest.component";
import { ContestManagementComponent } from "./contest-management/contest-management.component";
import { TemporadaCaracteriticasComponent } from "../admin-ligas/temporada-caracteriticas/temporada-caracteriticas.component";

const routes: Routes = [
  { path: "", component: CreateContestComponent },
  {
    path: ":idTemporada/:idLiga",
    component: ContestManagementComponent,
    children: [
      { path: "overview", component: CreateContestComponent },
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
export class ContestRoutingModule { }
