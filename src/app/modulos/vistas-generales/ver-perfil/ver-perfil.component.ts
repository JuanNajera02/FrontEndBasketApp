import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Usuario } from '../interfaces/perfil';
import { VistasGralService } from '../services/vistas-gral.service';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit{

  constructor(private tempService: VistasGralService) { }

  usuario: any = '';
  error: string = '';
  user: Usuario = {
    usuario: '',
    nombre: '',
    apellido: '',
    genero: '',
    rol: '',
    fechaNacimiento: ''
  };

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');
    this.obtenerPerfilUsuario(this.usuario);
  }

  obtenerPerfilUsuario(user: any){
    this.tempService.ObtenerPerfilUsuario(user).subscribe({
      next: (data: any) => {
        const usuario = data?.usuario;
        this.user.usuario = usuario;

        const nombre = data?.nombre;
        this.user.nombre = nombre;

        const apellido = data?.apellido;
        this.user.apellido = apellido;

        const genero = data?.genero;
        this.user.genero = genero;

        const rol = data?.rol;
        this.user.rol = rol;

        const fechaNacimiento = data?.fechaNacimiento;
        this.user.fechaNacimiento = fechaNacimiento;
      },
      error: (error) => {
        this.error = error;
      }
    });

  }

  guardarDatosPerfil(){
    if(this.user.nombre === ''){
      this.error = 'El nombre no puede estar vacío';
      setTimeout(() => {
        this.error = ''; // Limpiar el mensaje
      }, 5000);
      return;
    }
    if(this.user.apellido === ''){
      this.error = 'El apellido no puede estar vacío';
      setTimeout(() => {
        this.error = ''; // Limpiar el mensaje
      }, 5000);
      return;
    }

    this.tempService.modificarDatosUsuario(this.user.usuario, this.user.nombre, this.user.apellido).subscribe({
      next: (data: any) => {
        console.log(data);
        this.error = 'Datos actualizados correctamente';
        setTimeout(() => {
          this.error = ''; // Limpiar el mensaje
        }, 5000);
      },
      error: (error) => {
        this.error = error;
        console.log(error);
      }
    });

  }

}
