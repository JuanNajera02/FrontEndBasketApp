import { Component, OnInit } from '@angular/core';

import { ArbitroService } from '../servicios/arbitro.service';
import { EstatusPartido } from '../interfaces/EstatusPartido';
import { PartidoArbitroHome } from '../interfaces/PartidosArbitroHome';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-arbitro',
  templateUrl: './home-arbitro.component.html',
  styleUrls: ['./home-arbitro.component.css']
})
export class HomeArbitroComponent implements OnInit {
  
  partidos: PartidoArbitroHome[] = [];
  usuarioArbitro: string | undefined;
  estatusPartidos: EstatusPartido = EstatusPartido.FINALIZADOS;
  constructor(private arbitroService: ArbitroService,private router: Router) { }
  
  ngOnInit(): void {
    // get usuario from localstorage
    this.usuarioArbitro = localStorage.getItem("usuario") ?? "";
    this.obtenerPartidos();  
  }
  obtenerPartidos(){
    this.arbitroService.obtenerPartidos(this.usuarioArbitro,this.estatusPartidos).subscribe((data)=>{
      this.partidos = data;      

    });
  }
  verPartido(idPartido: string){
    this.router.navigate(['/ver-estadisticas-de-jugador-por-partido',idPartido]);
  }

}
