import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateTournamentComponent } from "./create-tournament/create-tournament.component";
import { TournamentRoutingModule } from "./tournament-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { GoogleMapsModule } from "@angular/google-maps";
import { SideNavContestManagementComponent } from "./side-nav-contest-management/side-nav-contest-management.component";
import { DirectiveModule } from "src/app/directives/directive.module";
import { TournamentManagementComponent } from "./tournament-management/tournament-management.component";

@NgModule({
  declarations: [
    CreateTournamentComponent,
    TournamentManagementComponent,
    SideNavContestManagementComponent,
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule, // ROUTES
    ReactiveFormsModule,
    AngularMaterialModule,
    GoogleMapsModule,
    DirectiveModule
  ],
  exports:[
    CreateTournamentComponent
  ]
})
export class TournamentModule { }
