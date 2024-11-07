import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../../../url-config';
import { TokenService } from '../../../services/tokenService/token.service';
import { Subject } from 'rxjs';
import { equiposRanking } from '../interfaces/equiposRanking';

@Injectable({
  providedIn: 'root'
})
export class VistasGralService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }
  private cambioURL = new Subject<string>();

  ObtenerRanking(idTemporada: string): Observable<equiposRanking[]> {
    const headers = this.tokenService.createHeaders();
    return this.http.get<equiposRanking[]>(url + '/Partido/rankingTemporadaRegular', {
      headers: headers,
      params: {
        idTemporada: idTemporada
      }
    });
  }

  ObtenerPerfilUsuario(user: any){
    const headers = this.tokenService.createHeaders();
    return this.http.get(url + '/usuarios/obtenerUsuario', {
      headers: headers,
      params: {
        usuario: user
      }
    });
  }

  modificarDatosUsuario(user: any, nombre: string, apellido: string){
    const headers = this.tokenService.createHeaders();
    const body = {
      usuario: user,
      nombre: nombre,
      apellido: apellido
    };

    return this.http.put(url + '/usuarios/ActualizarUsuario', body,{
      headers: headers
    });
  }

  obtenerPartidosDeEquipo(equipo: string, estatus: string) {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Partido/obtenerPartidosEquipo', {
      headers: headers,
      params: {
        idEquipo: equipo,
        estatusPartido: estatus
      }
    });
  }

//http://localhost:8080/estadisticas/equipo-temporada-estadisticas?nombreEquipo=equipes&temporadaId=1

  obtenerEstadisticasEquipoYTemporada(equipo: string, temporada: string) {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/estadisticas/equipo-temporada-estadisticas', {
      headers: headers,
      params: {
        nombreEquipo: equipo,
        temporadaId: temporada
      }
    });
  }

  //http://localhost:8080/Ligas/obtenerTemporadas?idLiga=1
  obtenerTemporadasDeLiga(liga: string) {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Ligas/obtenerTemporadas', {
      headers: headers,
      params: {
        idLiga: liga
      }
    });
  }

  //http://localhost:8080/usuarios/obtenerUsuario?usuario=juanpa02
  obtenerUsuario(user: string) {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/usuarios/obtenerUsuario', {
      headers: headers,
      params: {
        usuario: user
      }
    });
  }

  //http://localhost:8080/estadisticas/top-jugadores-tiros-libres?temporadaId=12
  obtenerTopJugadoresTirosLibres(temporada: string) {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/estadisticas/top-jugadores-tiros-libres', {
      headers: headers,
      params: {
        temporadaId: temporada
      }
    });
  }

  //http://localhost:8080/estadisticas/top-jugadores-tiros-de-2-puntos?temporadaId=12
  obtenerTopJugadoresTirosDe2Puntos(temporada: string) {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/estadisticas/top-jugadores-tiros-de-2-puntos', {
      headers: headers,
      params: {
        temporadaId: temporada
      }
    });
  }

  //http://localhost:8080/estadisticas/top-jugadores-tiros-de-3-puntos?temporadaId=12
  obtenerTopJugadoresTirosDe3Puntos(temporada: string) {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/estadisticas/top-jugadores-tiros-de-3-puntos', {
      headers: headers,
      params: {
        temporadaId: temporada
      }
    });
  }

  //http://localhost:8080/estadisticas/top-jugadores-asistencias?temporadaId=12
  obtenerTopJugadoresAsistencias(temporada: string) {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/estadisticas/top-jugadores-asistencias', {
      headers: headers,
      params: {
        temporadaId: temporada
      }
    });
  }

  //http://localhost:8080/Partido/obtenerPartidosTemporadaRegular?idTemporada=12
  obtenerPartidosTemporadaRegular(temporada: string) {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Partido/obtenerPartidosTemporadaRegular', {
      headers: headers,
      params: {
        idTemporada: temporada
      }
    });
  }

}
