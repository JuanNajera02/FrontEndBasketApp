import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { LigasServiceService } from '../adminLigasService/ligas-service.service';

@Component({
  selector: 'app-modificar-liga',
  templateUrl: './modificar-liga.component.html',
  styleUrls: ['./modificar-liga.component.css']
})
export class ModificarLigaComponent implements OnInit{

  constructor(private ligaService: LigasServiceService) {}

  nombreLiga: string = '';
  idLiga: number = 0;
  adminLiga: string = '';
  mensaje: string = '';
  adminsLigas: string[] = [];
  selectedAdmin: string = '';
  mensajeAdmin: string = '';
  adminsEnLiga: string[] = [];

  ngOnInit(): void {
    this.nombreLiga = localStorage.getItem('nombreLiga')?.toString()!;
    this.idLiga = parseInt(localStorage.getItem('idLiga')!);
    console.log(this.idLiga);
    this.obtenerAdminsNoEnLigas(this.idLiga);
    this.obtenerAdminsLiga(this.idLiga);

    this.ligaService.onNuevoAdminAsignado().subscribe(() => {
      this.adminsLigas = [];
      this.adminsEnLiga = [];
        this.obtenerAdminsNoEnLigas(this.idLiga);
        this.obtenerAdminsLiga(this.idLiga);
      });

  }

  modificarNombreLiga() {
    this.ligaService.modificarLiga(this.idLiga, this.nombreLiga).subscribe({
      next: (result) => {
        this.mensaje = result.message;
        this.ligaService.emitModificarLiga();

      },
      error: (error) => {
        this.mensaje = error.error[0].message;
      }
    });
  }

  agregarAdminLiga() {
    this.ligaService.asignarLiga(this.idLiga, this.selectedAdmin).subscribe({
      next: () => {

        this.mensajeAdmin = 'Administrador asignado exitosamente.';
        this.ligaService.emitNuevoAdminAsignado();
        this.selectedAdmin = '';
      },
      error: (error) => {
        this.mensajeAdmin = error.error[0].message;
      }
    });
  }

  obtenerAdminsNoEnLigas(idLiga: number) {
    this.ligaService.obtenerAdminsNoEnLiga(idLiga).subscribe({
      next: (result) => {
        result.forEach((element: any) => {
          this.adminsLigas.push(element);
        })

      }
    });
  }

  obtenerAdminsLiga(idLiga: number) {
    this.ligaService.obtenerAdminsDeLiga(idLiga).subscribe({
      next: (result) => {
        result.forEach((element: any) => {
          this.adminsEnLiga.push(element);
        })
      }
    });
  }

}
