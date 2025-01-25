import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../../tournament/interface';
import { Observable, Subject, tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddPlayerToTeamForm, AddTeamForm } from '../interfaces';
import { Player } from '../../jugadores/interface';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private newTeamSubject = new Subject<Team>();
  private newPlayer = new Subject<Player>();

  public newTeam$ = this.newTeamSubject.asObservable();
  public newPlayer$ = this.newPlayer.asObservable();

  private baseUrl: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  // THIS ENDPOINT ADD A TEAM IN A TOURNAMENT
  addTeam(team: Omit<Team, 'id'>, tournamentId: string,createdById:string): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/teams/createTeamInTournament`, {
      name:team.name,
      tournamentId,
      createdById
    }).pipe(
      tap((createdTeam:Team) => this.newTeamSubject.next(createdTeam) )
    )
  }

  addPlayerToTeamInTournament(tournamentId:string,teamId:string,playerName:string):Observable<Player> {
    return this.http.post<Player>(`${this.baseUrl}/players/createPlayerInTournamentTeam`,{
      tournamentId,
      teamId,
      playerName
    }).pipe(tap((newPlayerRes:Player) => {
      this.newPlayer.next(newPlayerRes)
    }))
  }

  getPlayersInTournamentTeam(tournamentId:string,teamId:string):Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/players/getPlayersInTournamentTeam?tournamentId=${tournamentId}&teamId=${teamId}`)
  }

  createAddTeamForm(): FormGroup<AddTeamForm> {
    return new FormGroup<AddTeamForm>({
      name: new FormControl("", { validators: [Validators.required], nonNullable: true }),
      email: new FormControl("", { validators: [Validators.required], nonNullable: true }),
    });
  }


  createAddPlayerToTeamForm(): FormGroup<AddPlayerToTeamForm> {
    return new FormGroup<AddPlayerToTeamForm>({
      name: new FormControl("", { validators: [Validators.required], nonNullable: true }),
      email: new FormControl("", { nonNullable: true }),
      position: new FormControl("", { nonNullable: true }),
    });
  }

}
