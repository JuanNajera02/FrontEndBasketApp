import { Component, Inject, OnInit } from '@angular/core';
import { TeamService } from '../teamService/team.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { AddPlayerToTeamForm } from '../interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { Player } from '../../jugadores/interface';

@Component({
  selector: 'app-add-player-to-team',
  templateUrl: './add-player-to-team.component.html',
  styleUrls: ['./add-player-to-team.component.css']
})
export class AddPlayerToTeamComponent implements OnInit {

  constructor(
    private teamServ: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: { teamId: string, tournamentId: string },
    private dialogRef: MatDialogRef<AddPlayerToTeamComponent>
  ) { }

  ngOnInit(): void {
    this.getPlayers()
  }

  public addPlayerToTeamForm: FormGroup<AddPlayerToTeamForm> = this.teamServ.createAddPlayerToTeamForm()
  public players: Player[] = []

  addPlayerToTeam(teamId: string, tournamentId: string): void {
    if (this.addPlayerToTeamForm.invalid) {
      return
    }
    const name = this.addPlayerToTeamForm.value.name as string
    this.teamServ.addPlayerToTeamInTournament(tournamentId, teamId, name).subscribe({
      next: (res) => {
        this.closeModal()
      },
      error: (err: HttpErrorResponse) => {
        console.log("err", err)
      }
    })
  }

  getPlayers() {
    this.teamServ.getPlayersInTournamentTeam(this.data.tournamentId, this.data.teamId).subscribe({
      next: (players: Player[]) => {
        this.players = players
      }
    })

  }

  closeModal() {
    this.dialogRef.close()
  }

}
