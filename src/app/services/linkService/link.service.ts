import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/app/url-config';

export interface LinkResponse {
  token: string
}
@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private http = inject(HttpClient);

  getLink(teamId: string, tournamentId: string): Observable<LinkResponse> {
    return this.http.get<LinkResponse>(`${url}/team-tournament-links/getLink/${teamId}/${tournamentId}`);
  }

  validateLink(teamId: string, tournamentId: string, token: string): Observable<any> {
    return this.http.get(`${url}/team-tournament-links/validate/${teamId}/${tournamentId}/${token}`);
  }


}
