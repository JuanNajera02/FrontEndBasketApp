import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../../../url-config';
import { TokenService } from '../../../services/tokenService/token.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private http: HttpClient, private tokenService: TokenService) {}
  private nuevoEquipo  = new Subject<void>();
  private modificacionJugadores = new Subject<void>();
  private modificacionJugadoresPartido = new Subject<void>();

  onNuevoEquipoCreado() {
    return this.nuevoEquipo.asObservable();
  }

  emitNuevoEquipoCreado() {
    this.nuevoEquipo.next();
  }

  onModificacionJugadores() {
    return this.modificacionJugadores.asObservable();
  }

  emitModificacionJugadores() {
    this.modificacionJugadores.next();
  }

  onModificacionJugadoresPartido() {
    return this.modificacionJugadoresPartido.asObservable();
  }

  emitModificacionJugadoresPartido() {
    this.modificacionJugadoresPartido.next();
  }

  obtenerEquipo(usuario: string){
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Equipo/obtenerEquipoAdminEquipo', {
      headers: headers,
      params: {
        idAdminEquipo: usuario
      }
    });
  }

  crearEquipo(equipo: any): Observable<any> {
    const headers = this.tokenService.createHeaders();

    // Ajusta la estructura del equipo antes de enviarla
    const equipoAjustado = {
      nombre: equipo.nombre,
      admin_equipo: { usuario: equipo.admin_equipo },
      rama: equipo.rama,
      categoria: equipo.categoria,
    };

    return this.http.post(url + '/Equipo/crearEquipo', equipoAjustado, { headers: headers });
  }

  obtenerJugadoresParaEquipo(equipo: string){
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Equipo/obtenerJugadoresParaEquipo', {
      headers: headers,
      params: {
        nombreEquipo: equipo
      }
    });
  }

  agregarJugadorAEquipo(jugador: any): Observable<any> {
    const headers = this.tokenService.createHeaders();

    const jugadorAjustado = {
      equipoNombre: jugador.equipoNombre,
      jugadorUsuario: jugador.jugadorUsuario,
      posicion: jugador.posicion
    };

    return this.http.post(url + '/Equipo/agregarJugador', jugadorAjustado, { headers });
  }

  //este

  obtenerJugadoresdeEquipo(equipo: string) {
    const headers = this.tokenService.createHeaders();
    const urlWithEquipo = `${url}/Equipo/${encodeURIComponent(equipo)}/jugadores`;

    return this.http.get(urlWithEquipo, { headers: headers });
  }

  eliminarJugadorDeEquipo(jugador: string, equipo: string) {
    const headers = this.tokenService.createHeaders();

    return this.http.delete(url + '/Equipo/eliminarJugador?nombreEquipo=' + equipo + '&nombreJugador=' + jugador, {
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

  //http://localhost:8080/Partido/obtenerEquipo1Equipo2?clavePartido=75
  obtenerEquipo1Equipo2(clavePartido: string) {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Partido/obtenerEquipo1Equipo2', {
      headers: headers,
      params: {
        clavePartido: clavePartido
      }
    });
  }

  //http://localhost:8080/JugadorPartido/agregarJugadorPartido
  agregarJugadorPartido(jugadorPartido: any): Observable<any> {
    const headers = this.tokenService.createHeaders();

    return this.http.post(url + '/JugadorPartido/agregarJugadorPartido', jugadorPartido, { headers });
  }

  //http://localhost:8080/JugadorPartido/obtenerJugadoresNoEnPartido?clavePartido=75&nombreEquipo=prueba pls funciona

  obtenerJugadoresDeEquipoNoEnPartido(equipo: string, clavePartido: string, equipo2: string) {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/JugadorPartido/obtenerJugadoresNoEnPartido', {
      headers: headers,
      params: {
        clavePartido: clavePartido,
        nombreEquipo: equipo,
        otroEquipo: equipo2
      }
    });
  }

    //http://localhost:8080/JugadorPartido/obtenerJugadoresDePartidoyEquipo?clavePartido=75&nombreEquipo=prueba pls funciona

    obtenerJugadoresDePartidoyEquipo(equipo: string, clavePartido: string) {
      const headers = this.tokenService.createHeaders();

      return this.http.get(url + '/JugadorPartido/obtenerJugadoresDePartidoyEquipo', {
        headers: headers,
        params: {
          clavePartido: clavePartido,
          nombreEquipo: equipo,
        }
      });
    }

    obtenerJugadoresDePartidoEnBanca(equipo: string, clavePartido: string, enBanca: boolean) {
      const headers = this.tokenService.createHeaders();

      return this.http.get(url + '/JugadorPartido/obtenerJugadoresDePartidoyEquipo', {
        headers: headers,
        params: {
          clavePartido: clavePartido,
          nombreEquipo: equipo,
          enBanca: enBanca
        }
      });
    }

    obtenerJugadoresDePartidoEnCancha(equipo: string, clavePartido: string, enBanca: boolean) {
      const headers = this.tokenService.createHeaders();

      return this.http.get(url + '/JugadorPartido/obtenerJugadoresDePartidoyEquipo', {
        headers: headers,
        params: {
          clavePartido: clavePartido,
          nombreEquipo: equipo,
          enBanca: enBanca
        }
      });
    }

    //http://localhost:8080/JugadorPartido/PosicionarJugador?clavePartido=75&usuario=elpepe&enBanca=false

    posicionarJugador(clavePartido: string, usuario: string, enBanca: boolean) {
      const headers = this.tokenService.createHeaders();

      const urlWithParams = `${url}/JugadorPartido/PosicionarJugador?clavePartido=${clavePartido}&usuario=${usuario}&enBanca=${enBanca}`;

      return this.http.put(urlWithParams, null, { headers });
    }

}
