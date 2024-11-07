import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearLigaComponent } from '../crear-liga/crear-liga.component';
import { OnInit } from '@angular/core';
import { LigasServiceService } from '../adminLigasService/ligas-service.service';
import { LigasAdmin } from '../interfaces/Ligas'
import { TemporadasLigas } from '../interfaces/TemporadasLigas';
import { Router } from '@angular/router';
import { ModificarLigaComponent } from '../modificar-liga/modificar-liga.component';
import { CrearTemporadaComponent } from '../crear-temporada/crear-temporada.component';
import { TemporadasService } from '../adminLigasService/temporadas.service';

@Component({
  selector: 'app-home-admin-ligas',
  templateUrl: './home-admin-ligas.component.html',
  styleUrls: ['./home-admin-ligas.component.css']
})
export class HomeAdminLigasComponent implements OnInit{
  ligasAdministrador: LigasAdmin[] = [];
  temporadasPorLiga: { [key: number]: TemporadasLigas[] } = {};

  usuario: any = '';
  ligasAsignadas: number = 0;
  idLiga: number = 0;

  constructor(public dialog: MatDialog, private ligaService: LigasServiceService, private router: Router, private tempService: TemporadasService) { }

  openDialog(): void {
    this.dialog.open(CrearLigaComponent,{
      width: '450px',
    })
  }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario');
    this.obtenerLigas();

    this.ligaService.onNuevaLigaCreada().subscribe(() => {

      this.obtenerLigas();
    });

    this.ligaService.onModificarLiga().subscribe(() => {

      this.obtenerLigas();
    });

    this.tempService.onNuevaTemporadaCreada().subscribe(() => {
      this.obtenerLigas();
    });

  }

  obtenerLigas() {
    this.ligaService.getLigas(this.usuario).subscribe({
      next: (data) => {
        this.ligasAdministrador = data;
        this.ligasAsignadas = data.length;

        // Ahora que tienes la lista de ligas, obtén las temporadas para cada una
        this.ligasAdministrador.forEach((liga) => {
          this.obtenerTemporadas(liga.idLiga);
        });
      }
    });
  }

  obtenerTemporadas(idLiga: number) {
    this.ligaService.getTemporadas(idLiga).subscribe({
      next: (data) => {
        this.temporadasPorLiga[idLiga] = data;
      }
    });
  }

  verTemporada(idTemporada: number) {
    this.router.navigate(['/temporadaCaracteristicas', idTemporada]);
  }

  openDialogModificarLiga(idLiga: number, nombreLiga: string): void {
    localStorage.setItem('idLiga', idLiga.toString());
    localStorage.setItem('nombreLiga', nombreLiga);

    this.dialog.open(ModificarLigaComponent,{
      width: '500px',
    })
  }

  openDialogCrearTemporada(liga: number){
    localStorage.setItem('idLiga', liga.toString());
    this.dialog.open(CrearTemporadaComponent,{
      width: '600px',
    })
  }

}
