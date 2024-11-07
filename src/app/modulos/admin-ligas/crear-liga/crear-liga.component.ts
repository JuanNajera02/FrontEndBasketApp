import { Component, OnInit } from '@angular/core';
import { Liga } from '../../../models/Ligas/Ligas';
import { LigasServiceService } from '../adminLigasService/ligas-service.service';

@Component({
  selector: 'app-crear-liga',
  templateUrl: './crear-liga.component.html',
  styleUrls: ['./crear-liga.component.css']
})
export class CrearLigaComponent implements OnInit{
  liga: Liga = {
    nombre: ''
  }
  usuario: any = '';
  mensaje: string = "";
  idLiga: number = 0;

  constructor(private ligaService: LigasServiceService) {}

  crearLiga() {
    this.ligaService.createLiga(this.liga).subscribe({
      next: (result) => {
        this.mensaje = result.message;

        this.idLiga = result.responseData.idLiga;
        this.asignarLigaAdmin()
      },
      error: (error) => {
        this.mensaje = error.error[0].message;
      }
    });
  }

  asignarLigaAdmin() {
    this.ligaService.asignarLiga(this.idLiga, this.usuario).subscribe({
      next: () => {
        this.ligaService.emitNuevaLigaCreada();
      }
    });
  }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario');
  }

}

