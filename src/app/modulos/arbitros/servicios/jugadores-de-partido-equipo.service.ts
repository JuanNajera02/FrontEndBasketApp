import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/services/tokenService/token.service';
import { url } from 'src/app/url-config';
import { EstadisticasJugador } from '../interfaces/EstadisticasJugador';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugadoresDePartidoEquipoService {

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // GET /JugadorPartido/obtenerJugadoresDePartidoyEquipo?clavePartido=9&nombreEquipo=chivas&enBanca=0

  obtenerJugadoresDePartidoYEquipo(idPartido: number | undefined, nombreEquipo: string | undefined) {
    // va a retornar una lista
    return this.http.get<EstadisticasJugador[]>( url + `/JugadorPartido/obtenerJugadoresDePartidoyEquipo?clavePartido=${idPartido}&nombreEquipo=${nombreEquipo}`, {
    headers: this.tokenService.createHeaders()});
  }

  obtenerJugadoresdeEquipo(equipo: string) {
    const headers = this.tokenService.createHeaders();
    const urlWithEquipo = `${url}/Equipo/${encodeURIComponent(equipo)}/jugadores`;

    return this.http.get(urlWithEquipo, { headers: headers });
  }

    //http://localhost:8080/usuarios/obtenerTipoUser?usuario=arbitro13
    obtenerTipoUsuario(usuario: string | undefined): Observable<string>{
      return this.http.get<string>(url + "/usuarios/obtenerTipoUser?usuario="+usuario)
    }
    // http://localhost:8080/JugadorPartido/obtenerPuntosEquipo?nombreEquipo=Denver Nuggets&clavePartido=17
    obtenerPuntosEquipo(nombreEquipo: string | undefined,clavePartido: number | undefined){
      return this.http.get<any>(url + "/JugadorPartido/obtenerPuntosEquipo?nombreEquipo="+nombreEquipo+"&clavePartido="+clavePartido)
    }

}
