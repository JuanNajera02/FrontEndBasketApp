import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TemporadasService } from '../adminLigasService/temporadas.service';
import { Temporadas } from '../interfaces/Temporadas';
import { Categoria } from '../interfaces/Temporadas';
import { Rama } from '../interfaces/Temporadas';

@Component({
  selector: 'app-crear-temporada',
  templateUrl: './crear-temporada.component.html',
  styleUrls: ['./crear-temporada.component.css']
})
export class CrearTemporadaComponent implements OnInit{
  mensaje: string = '';
  claveTemporada: number = 0;
  temporada: Temporadas = {
    nombreTemporada: '',
    fechaInicio: null, // Inicializado como null
    fechaTermino: null, // Inicializado como null
    cantidadEquipos: 8,
    categoria: Categoria.SENIOR,
    rama: Rama.MASCULINO
  }
  idLiga: number = 0;

  categorias: string[] = Object.values(Categoria)
  .filter(value => typeof value === 'string')
  .map(value => value as string);

  ramas: string[] = Object.values(Rama)
  .filter(value => typeof value === 'string')
  .map(value => value as string);

  constructor(private tempService: TemporadasService) {}

  ngOnInit(): void {
    this.idLiga = Number(localStorage.getItem('idLiga'));
  }

  crearTemporada() {
    this.tempService.crearTemporada(this.temporada).subscribe({
      next: (result) => {
        this.mensaje = result.message;
        this.claveTemporada = result.claveTemporada;
        this.asignarTemporada(this.claveTemporada, this.idLiga);
      },
      error: (error) => {
        this.mensaje = error.error[0].message;
      }
    });
  }

  asignarTemporada(claveTemp: number, claveLiga: number) {
    this.tempService.asignarTemporada(claveTemp, claveLiga).subscribe({
      next: () => {
        this.tempService.emitNuevaTemporadaCreada();
      }
    });
  }

}
