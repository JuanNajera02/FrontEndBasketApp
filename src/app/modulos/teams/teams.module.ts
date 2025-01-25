import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTeamComponent } from './add-team/add-team.component';
import { AddPlayersToTeamLinkComponent } from './add-players-to-team-link/add-players-to-team-link.component';
import { TeamPlayersComponent } from './team-players/team-players.component';
import { PlayerTableComponent } from './player-table/player-table.component';
import { ButtonComponent } from 'src/app/shared/button/button.component';
import { AddPlayerToTeamComponent } from './add-player-to-team/add-player-to-team.component';
import { InputComponent } from 'src/app/shared/input/input.component';


@NgModule({
  declarations: [
    AddTeamComponent,
    AddPlayersToTeamLinkComponent,
    TeamPlayersComponent,
    PlayerTableComponent,
    AddPlayerToTeamComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent
  ]
})
export class TeamsModule { }
