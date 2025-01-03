import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../../../url-config';
import { TokenService } from '../../../services/tokenService/token.service';
import { Subject } from 'rxjs';
import { Temporadas } from './../interfaces/Temporadas';
import { PartidosCaracteristicas } from '../interfaces/PartidosCaracteristicas';

@Injectable({
  providedIn: 'root'
})
export class TemporadasService {
  private nuevaTemporadaSubject = new Subject<void>();
  private nuevoArbitroSubject = new Subject<void>();
  private nuevoEquipoSubject = new Subject<void>();
  private EstadoTemporadaSubject = new Subject<void>();
  private nuevoArbitroPartidoSubject = new Subject<void>();
  private nuevaFechaPartidoSubject = new Subject<void>();
  private nuevosPartidosSubject = new Subject<void>();
  private caracteristicasTemporadaSubject = new Subject<void>();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  onCaracteristicasTemporadaActualizadas() {
    return this.caracteristicasTemporadaSubject.asObservable();
  }

  emitCaracteristicasTemporadaActualizadas() {
    this.caracteristicasTemporadaSubject.next();
  }

  onNuevaTemporadaCreada() {
    return this.nuevaTemporadaSubject.asObservable();
  }

  emitNuevaTemporadaCreada() {
    this.nuevaTemporadaSubject.next();
  }

  onNuevoArbitroAsignado() {
    return this.nuevoArbitroSubject.asObservable();
  }

  emitNuevoArbitroAsignado() {
    this.nuevoArbitroSubject.next();
  }

  onNuevoEquipoAsignado() {
    return this.nuevoEquipoSubject.asObservable();
  }

  emitNuevoEquipoAsignado() {
    this.nuevoEquipoSubject.next();
  }

  onEstadoTemporadaActualizado() {
    return this.EstadoTemporadaSubject.asObservable();
  }

  emitEstadoTemporadaActualizado() {
    this.EstadoTemporadaSubject.next();
  }

  onNuevoArbitroPartidoAsignado() {
    return this.nuevoArbitroPartidoSubject.asObservable();
  }

  emitNuevoArbitroPartidoAsignado() {
    this.nuevoArbitroPartidoSubject.next();
  }

  onNuevaFechaPartidoAsignada() {
    return this.nuevaFechaPartidoSubject.asObservable();
  }

  emitNuevaFechaPartidoAsignada() {
    this.nuevaFechaPartidoSubject.next();
  }

  onNuevosPartidosGenerados() {
    return this.nuevosPartidosSubject.asObservable();
  }

  emitNuevosPartidosGenerados() {
    this.nuevosPartidosSubject.next();
  }

  obtenerArbitros(idTemporada: number): Observable<any> {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Temporadas/obtenerArbitros', {
      headers: headers,
      params: {
        idTemporada: idTemporada
      }
    });
  }

  obtenerArbitrosSinTemporada(idTemporada: number): Observable<any> {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Temporadas/obtenerArbitrosNoEnTemporada', {
      headers: headers,
      params: {
        idTemporada: idTemporada
      }
    });

  }

  asignarArbitro(idTemporada: number, usuario: string): Observable<any> {
    const headers = this.tokenService.createHeaders();

    const body = {
      temporadaId: idTemporada,
      arbitroId: usuario
    };

    return this.http.post(url + '/Temporadas/agregarArbitro', body, {
      headers: headers
    });
  }

  crearTemporada(temporada: Temporadas): Observable<any> {
    const headers = this.tokenService.createHeaders();

    return this.http.post(url + '/Temporadas/crearTemporada', temporada, {
      headers: headers
    });
  }

  asignarTemporada(idTemporada: number, idLiga: number): Observable<any> {
    const headers = this.tokenService.createHeaders();

    const body = {
      ligaId: idLiga,
      temporadaId: idTemporada
    };

    return this.http.put(url + '/Temporadas/asignarLiga', body, {
      headers: headers
    });
  }

  obtenerEquiposTemporada(idTemporada: number): Observable<any> {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/EquipoTemporada/obtenerEquiposTemporada', {
      headers: headers,
      params: {
        temporadaId: idTemporada
      }
    });
  }

  asignarEquipoATemporada(temporadaId: number, nombreEquipo: string) {
    const headers = this.tokenService.createHeaders();
    const body = {
      temporada: { claveTemporada: temporadaId },
      equipo: { nombre: nombreEquipo },
    };

    return this.http.post(url + '/EquipoTemporada/crearEquipoTemporada', body,{
      headers: headers
    });
  }

  obtenerEquiposNoEnTemporada(idTemporada: number): Observable<any> {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/EquipoTemporada/obtenerEquiposNoEnTemporada', {
      headers: headers,
      params: {
        temporadaId: idTemporada
      }
    });
  }

  eliminarEquipoDeTemporada(temporadaId: string, nombreEquipo: string) {
    const headers = this.tokenService.createHeaders();

    const httpOptions = {
      headers: headers,
      body: {
        temporada: { claveTemporada: temporadaId },
        equipo: { nombre: nombreEquipo },
      },
    };

    return this.http.delete(url + '/EquipoTemporada/eliminarEquipoTemporada', httpOptions);
  }

  eliminarArbitroDeTemporada(temporadaId: string, usuario: string) {
    const headers = this.tokenService.createHeaders();

    const httpOptions = {
      headers: headers,
    };

    return this.http.delete(url + `/Temporadas/eliminarArbitro?temporadaId=${temporadaId}&arbitroId=${usuario}`, httpOptions);
}

  obtenerEstadoTemporada(idTemporada: number): Observable<any> {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Temporadas/obtenerEstadoTemporada', {
      headers: headers,
      params: {
        idTemporada: idTemporada
      }
    });

  }

  generarPartidos(idTemporada: number): Observable<any> {
    const headers = this.tokenService.createHeaders();

    const body = { idTemporada: idTemporada };

    return this.http.post(url + '/Partido/generarPartidosTemporada', body, { headers: headers });
  }

  crearPartidosTemporadaRegular(idTemporada: number, cantidadEnfrentamientosRegular: number): Observable<any> {
    const headers = this.tokenService.createHeaders();

    const body = {
      idTemporada: idTemporada,
      cantidadEnfrentamientosRegular: cantidadEnfrentamientosRegular
    };

    return this.http.post(url + '/Partido/crearPartidosTemporadaRegular', body, { headers: headers });
  }

  //http://localhost:8080/Partido/crearPartidosEliminatorias
//   {
//     "idTemporada":1
// }

  crearPartidosEliminatorias(idTemporada: number): Observable<any> {
    const headers = this.tokenService.createHeaders();

    const body = {
      idTemporada: idTemporada
    };

    return this.http.post(url + '/Partido/crearPartidosEliminatorias', body, { headers: headers });
  }

  obtenerPartidosTemporada(idTemporada: number): Observable<any> {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Partido/obtenerPartidosTemporada', {
      headers: headers,
      params: {
        idTemporada: idTemporada
      }
    });
  }

  asignarArbitroPartido(clavePartido: number, arbitro: string): Observable<any> {
    const headers = this.tokenService.createHeaders();

    const body = {
      clavePartido: clavePartido,
      arbitro: {
        usuario: arbitro
      }
    };

    return this.http.put(url + '/Partido/asignarArbitro', body, {
      headers: headers
    });
  }

  agendarPartido(clavePartido: number, fechaInicio: string): Observable<any> {
    const headers = this.tokenService.createHeaders();
    console.log(fechaInicio + " en el service de angular");
    const body = {
      clavePartido: clavePartido,
      fechaInicio: fechaInicio
    };

    return this.http.put(url + '/Partido/agendar', body, {
      headers: headers
    });
  }

  modificarCaracteristicasTemp(partidosCaracteristicas: PartidosCaracteristicas, idTemporada: number ){
    const headers = this.tokenService.createHeaders();
    const body = {
      claveTemporada: idTemporada,
      cantidadEquipos: partidosCaracteristicas.numeroEquiposTemporada,
      cantidadPlayoffs: partidosCaracteristicas.cantidadEquiposPlayOff,
      cantidadEnfrentamientosRegular: partidosCaracteristicas.cantidadDeEncuentros
    };

    return this.http.put(url + '/Temporadas/modificarCaracteristicasTemporada', body, {
      headers: headers
    });
  }

  obtenerCaracteristicasTemporada(idTemporada: number): Observable<any> {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Temporadas/obtenerCaracteristicasTemporada', {
      headers: headers,
      params: {
        idTemporada: idTemporada
      }
    });
  }

}

