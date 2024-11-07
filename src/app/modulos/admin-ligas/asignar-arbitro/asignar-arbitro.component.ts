import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TemporadasService } from '../adminLigasService/temporadas.service';
import { ActivatedRoute } from '@angular/router';
import { ArbitrosTemporadas } from '../interfaces/ArbitrosTemporadas';

@Component({
  selector: 'app-asignar-arbitro',
  templateUrl: './asignar-arbitro.component.html',
  styleUrls: ['./asignar-arbitro.component.css']
})
export class AsignarArbitroComponent implements OnInit{
  arbitroTemp: ArbitrosTemporadas = {
    temporadaId: 0,
    arbitroId: ''
  }
  arbitros: string[] = [];
  idTemporada: number = 0;
  mensaje: string = "";
  selectedArbitro: string = '';

  constructor(private tempService: TemporadasService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idTemporada = +localStorage.getItem('idTemporada')!;
    this.obtenerArbitrosNoEnTemporada(this.idTemporada);
    this.selectedArbitro = this.arbitroTemp.arbitroId;

    this.tempService.onNuevoArbitroAsignado().subscribe({
      next: () => {
        this.arbitros = [];
        this.obtenerArbitrosNoEnTemporada(this.idTemporada);

      }
    });

  }

  asignarArbitroTemp(idTemporada: number, usuario: string) {

    this.tempService.asignarArbitro(idTemporada, usuario).subscribe({
      next: (result) => {
        this.mensaje = result.message;
        this.tempService.emitNuevoArbitroAsignado();
        this.selectedArbitro = '';
      },
      error: (error) => {
        this.mensaje = error.error[0].message;
      }
    });
  }

  obtenerArbitrosNoEnTemporada(idTemporada: number) {
    this.tempService.obtenerArbitrosSinTemporada(idTemporada).subscribe({
      next: (result) => {
        result.forEach((element: any) => {
          this.arbitros.push(element);
        })
      }
    });
  }

}
