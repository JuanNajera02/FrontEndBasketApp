import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../../../url-config';
import { TokenService } from '../../../services/tokenService/token.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  //http://localhost:8080/Partido/obtenerPartidosJugador?idJugador=tntjarcor02
  obtenerPartidosJugador(jugador: string): Observable<any> {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Partido/obtenerPartidosJugador', {
      headers: headers,
      params: {
        idJugador: jugador
      }
    });
  }

}
