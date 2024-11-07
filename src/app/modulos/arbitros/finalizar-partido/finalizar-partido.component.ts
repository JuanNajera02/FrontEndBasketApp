import { Component, Input } from '@angular/core';
import { PartidosService } from 'src/app/services/partidosService/partidos.service';

@Component({
  selector: 'app-finalizar-partido',
  templateUrl: './finalizar-partido.component.html',
  styleUrls: ['./finalizar-partido.component.css']
})
export class FinalizarPartidoComponent  {
  @Input() clavePartido: number | undefined;
  mensaje: string = ""
  constructor(private partidoServ: PartidosService) { }

  finalizarPartido(){
    this.partidoServ.finalizarPartido(this.clavePartido).subscribe({
      next: (data: any) => {
        console.log(this.clavePartido);
        // recargar la pagina
        location.reload();

      },
      error: (errores: any) => {
        console.log("errores " , errores.error)

        setTimeout(() => {
          this.mensaje = errores.error[0].message;
          setTimeout(()=>{
            this.mensaje = "";
          },2000)
        }, 2000);
      },
    });

  }

}
