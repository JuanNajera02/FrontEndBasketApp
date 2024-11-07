import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { VistasGralService } from '../services/vistas-gral.service';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Usuario } from '../interfaces/Usuario';

@Component({
  selector: 'app-busqueda-usuario',
  templateUrl: './busqueda-usuario.component.html',
  styleUrls: ['./busqueda-usuario.component.css']
})
export class BusquedaUsuarioComponent implements OnInit {

  constructor(private vistasService: VistasGralService, private router: Router, private route: ActivatedRoute) { }

  usuario: any = '';
  hayUser: boolean = false;
  user: Usuario = {
    usuario: '',
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    genero: '',
    rol: ''
  };

  ngOnInit(): void {
    // Obtén los parámetros de la ruta
    this.route.params.subscribe(params => {

      this.usuario = params['texto'];

    });

      this.obtenerUsuario();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Obtén los nuevos parámetros de la ruta cuando cambie la URL
      this.route.params.subscribe(params => {
        this.usuario = params['texto'];

        //  this.partidos = [];
        this.obtenerUsuario();

      });
    });
  }

  obtenerUsuario(){
    this.vistasService.ObtenerPerfilUsuario(this.usuario).subscribe({
      next: (data: any) => {
        console.log(data);
        this.user = data;
        console.log(this.user);
        this.hayUser = true;
      },
      error: error => {
        console.log(error);
        this.hayUser = false;
      }
    });

  }

}
