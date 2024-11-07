import { Component, OnInit } from '@angular/core';
import { TemporadasService } from '../adminLigasService/temporadas.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-agregar-fecha-partido',
  templateUrl: './agregar-fecha-partido.component.html',
  styleUrls: ['./agregar-fecha-partido.component.css']
})
export class AgregarFechaPartidoComponent implements OnInit{

  fechaPartido: string = "";
  horaPartido: string = "";
  idPartido: number = 0;
  mensaje: string = "";

  constructor(private tempService: TemporadasService) { }

  ngOnInit(): void {
    this.idPartido = +localStorage.getItem('idPartido')!;
  }

  agendarPartido(idPartido: number, fecha: string, hora: string) {
    console.log(" id partido: " + idPartido + " fecha: " + fecha + " hora: " + hora);
    try {
      // Formatea la fecha en el formato "YYYY-MM-DD" y la hora en "HH:mm:ss"
      const fechaHoraFormateada = format(new Date(fecha), "yyyy-MM-dd") + " " + hora;

      console.log("fecha formateada: " + fechaHoraFormateada);

      this.tempService.agendarPartido(idPartido, fechaHoraFormateada).subscribe({
        next: (result) => {
          this.mensaje = result.message;
          this.tempService.emitNuevaFechaPartidoAsignada();
          this.tempService.asignarArbitroPartido(idPartido, '').subscribe({
            next: (result) => {
              console.log(result);
              this.tempService.emitNuevoArbitroPartidoAsignado();
            }
          });
        },
        error: (error: any) => {
          this.mensaje = error.error[0].message;
        }
      });
    } catch (error) {
      this.mensaje = "Error al agendar el partido";
    }
  }

}
