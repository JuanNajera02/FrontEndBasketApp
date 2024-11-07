import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcadorService {
  private puntosEquipoSubject = new BehaviorSubject<{ [key: string]: number | undefined}>({});

  getPuntosEquipo(nombreEquipo: string | undefined, clavePartido: number | undefined): Observable<number> {
    return this.puntosEquipoSubject.asObservable().pipe(
      map(puntosEquipo => puntosEquipo[`${nombreEquipo}-${clavePartido}`] || 0)
    );
  }
  actualizarPuntosEquipo(nombreEquipo: string | undefined,clavePartido: number | undefined, puntos: number | undefined) {
    const puntosEquipo = { ...this.puntosEquipoSubject.value };
    puntosEquipo[`${nombreEquipo}-${clavePartido}`] = puntos;
    this.puntosEquipoSubject.next(puntosEquipo);
  }
}
