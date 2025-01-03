import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AddTournament, AddTournamentResponse, Tournament } from "./interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TournamentService {
  baseUrl: string = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  addTournament(tournament: AddTournament): Observable<AddTournamentResponse> {
    return this.http.post<AddTournamentResponse>(`${this.baseUrl}/tournaments/createTournament`, tournament);
  }

  getTournamentById(id: string): Observable<Tournament> {

    return this.http.get<Tournament>(`${this.baseUrl}/tournaments/getTournament?tournamentId=${id}`);
  }

}
