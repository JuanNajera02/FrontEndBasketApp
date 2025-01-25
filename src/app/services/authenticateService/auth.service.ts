import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SignUp } from '../../models/Login/Register';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { url } from '../../url-config';
import { Credential } from '../../models/Login/Credential';
import { TokenService } from '../tokenService/token.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class authService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}
  user: string = '';
  mensaje_errores: string = '';

  registerUser(rgr: any): Observable<any> {
    return this.http.post(url + '/auth/register', rgr, {
      observe: 'response'
    }).pipe(
      map((response: HttpResponse<any>) => {
        const token = response.body.token;

        localStorage.setItem('token', token);
        this.user = rgr.usuario;
        localStorage.setItem('usuario', rgr.usuario);
        return response.body;
      }),
      catchError((error) => {
        if (error.error && Array.isArray(error.error)) {
          const errores = error.error;
          for (let i = 0; i < errores.length; i++) {
            const mensajeError = errores[i].message;
            this.mensaje_errores += mensajeError + '. ';
          }

        }
        return throwError(() => this.mensaje_errores);
      }))

  }

  login(creds: Credential): Observable<any> {
    return this.http.post(url + '/auth/authenticate', creds, {
      observe: 'response'
    }).pipe(
      map((response: HttpResponse<any>) => {
        const token = response.body.token;
        localStorage.setItem('token', token);
        this.user = creds.usuario;
        localStorage.setItem('usuario', creds.usuario);
        return response.body;
      }),
      catchError((error: HttpErrorResponse ) => {

        const errorMessage = error.error[0].message;

        return throwError(() => errorMessage); // Retorna el mensaje de error
      })
    );
  }

  obtenerTipoUsuario(usuario: string | undefined): Observable<string>{
    return this.http.get<string>(url + "/usuarios/obtenerTipoUser?usuario="+usuario)
  }

  getUserId():string{
    return "1"
  }

}
