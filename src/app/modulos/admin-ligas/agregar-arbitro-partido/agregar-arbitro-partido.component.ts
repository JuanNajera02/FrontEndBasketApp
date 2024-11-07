import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TemporadasService } from '../adminLigasService/temporadas.service';

@Component({
  selector: 'app-agregar-arbitro-partido',
  templateUrl: './agregar-arbitro-partido.component.html',
  styleUrls: ['./agregar-arbitro-partido.component.css']
})
export class AgregarArbitroPartidoComponent implements OnInit{
  selectedArbitro: string = '';
  arbitros: string[] = [];
  idTemporada: number = 0;
  mensaje: string = "";
  idPartido: number = 0;

  constructor(private tempService: TemporadasService) { }

  ngOnInit(): void {
    this.idTemporada = +localStorage.getItem('idTemporada')!;
    this.idPartido = +localStorage.getItem('idPartido')!;
    this.obtenerArbitros();
  }

  asignarArbitroPartido(idPartido: number, selectedArbitro: string){
    this.tempService.asignarArbitroPartido(idPartido, selectedArbitro).subscribe({
      next: (result) => {
        this.mensaje = result.message;
        this.tempService.emitNuevoArbitroPartidoAsignado();
      },
      error: (err) => {
        this.mensaje = err.error[0].message;
      }
    });
  }

  obtenerArbitros(){
    this.tempService.obtenerArbitros(this.idTemporada).subscribe({
      next: (result) => {
        result.forEach((element: any) => {
          this.arbitros.push(element.usuario);
        });
      }
    });
  }

}
