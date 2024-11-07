import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { url } from '../../../url-config';
import { TokenService } from '../../../services/tokenService/token.service';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  private searchUsersSubject = new Subject<string>();
  private searchTeamsSubject = new Subject<string>();
  private searchTemporadasSubject = new Subject<string>();
  private searchLigasSubject = new Subject<string>();

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  // Método para manejar las solicitudes mientras escribes para usuarios
  searchUsersOnTyping(query: string): void {
    this.searchUsersSubject.next(query);
  }

  // Método para manejar las solicitudes mientras escribes para equipos
  searchTeamsOnTyping(query: string): void {
    this.searchTeamsSubject.next(query);
  }

  searchTemporadasOnTyping(query: string): void {
    this.searchTemporadasSubject.next(query);
  }

  searchLigasOnTyping(query: string): void {
    this.searchLigasSubject.next(query);
  }

  // Método para obtener resultados mientras escribes para usuarios
  getSearchResultsUsers(): Observable<any> {
    return this.searchUsersSubject.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((query) => this.searchUsers(query))
    );
  }

  // Método para obtener resultados mientras escribes para equipos
  getSearchResultsTeams(): Observable<any> {
    return this.searchTeamsSubject.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((query) => this.searchTeams(query))
    );
  }

  // Método para obtener resultados mientras escribes para temporadas
  getSearchResultsTemporadas(): Observable<any> {
    return this.searchTemporadasSubject.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((query) => this.searchTemporadas(query))
    );
  }

  // Método para obtener resultados mientras escribes para ligas
  getSearchResultsLigas(): Observable<any> {
    return this.searchLigasSubject.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((query) => this.searchLigas(query))
    );
  }

  searchUsers(query: string): Observable<any> {
    const urlFinal = `${url}/usuarios/obtenerJugador?usuario=${query}`;
    return this.http.get(urlFinal);
  }

  searchTeams(query: string): Observable<any> {
    const urlFinal = `${url}/Equipo/buscarEquipoPorNombre`;
    const params = { nombre: query };
    const headers = this.tokenService.createHeaders();

    console.log(urlFinal, params);

    return this.http.get(urlFinal, { params, headers });
  }

  // ahora para las temporadas

  searchTemporadas(query: string): Observable<any> {
    const urlFinal = `${url}/Temporadas/buscarTemporadasPorNombre`;
    const params = { nombreTemporada: query };
    const headers = this.tokenService.createHeaders();

    console.log(urlFinal, params);

    return this.http.get(urlFinal, { params, headers });
  }

  //ahora con ligas

  searchLigas(query: string): Observable<any> {
    const urlFinal = `${url}/Ligas/buscarLigaPorNombre`;
    const params = { nombre: query };
    const headers = this.tokenService.createHeaders();

    console.log(urlFinal, params);

    return this.http.get(urlFinal, { params, headers });
  }

}
