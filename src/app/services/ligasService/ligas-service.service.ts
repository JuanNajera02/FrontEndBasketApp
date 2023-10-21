import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Liga } from '../../models/Ligas/Ligas';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { url } from '../../url-config';
import { TokenService } from '../tokenService/token.service';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LigasServiceService {
  private nuevaLigaSubject = new Subject<void>();

  constructor(private http: HttpClient, private tokenService: TokenService) {}


  createLiga(liga: Liga): Observable<{ message: string, responseData: any }> {
    const headers = this.tokenService.createHeaders();

    return this.http.post(url + '/Ligas/crearLiga', liga, {
      headers: headers,
      observe: 'response'
    }).pipe(
      map((data) => {
        this.nuevaLigaSubject.next();
        const message = 'Liga creada exitosamente.';
        return { message, responseData: data.body };
      })
    );
  }

  onNuevaLigaCreada() {
    return this.nuevaLigaSubject.asObservable();
  }

  emitNuevaLigaCreada() {
    this.nuevaLigaSubject.next();
  }

  getLigas(usuario: string): Observable<any> {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Ligas/obtenerLigasDeAdmin', {
      headers: headers,
      params: {
        usuario: usuario
      }
    });
  }

  getTemporadas(idLiga: number): Observable<any> {
    const headers = this.tokenService.createHeaders();

    return this.http.get(url + '/Temporadas/obtenerTemporadasDeLiga', {
      headers: headers,
      params: {
        idLiga: Number(idLiga)
      }
    });
  }

  asignarLiga(idLiga: number, usuario: string): Observable<any> {
    const headers = this.tokenService.createHeaders();

    const body = {
      ligaId: idLiga,
      usuarioId: usuario
    };

    return this.http.post(url + '/Ligas/asignarAdmin', body, {
      headers: headers
    });
  }



}
