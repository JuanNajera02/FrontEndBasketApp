import { Component  } from '@angular/core';
import { Register, Password } from '../../../models/Login/Register';
import { Router } from '@angular/router';
import { authService } from 'src/app/services/authenticateService/auth.service';
import { Gender } from '../../../models/Login/Gender';
import { Role } from '../../../models/Login/Role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registro: Register = {
    usuario: '',
    nombre: '',
    fechaNacimiento: new Date(),
    apellido: '',
    email: '',
    password: '',
    genero: Gender.MASCULINO,
    rol: Role.ANONIMO
  };
  error: any;
  password2: Password = {
    password: ''
  };

  constructor(
    private service: authService,
    private router: Router
  ) { }

  register() {
    //valida si las 2 contraseñas son iguales
    if (this.registro.password != this.password2.password) {
      this.error = "Las contraseñas no coinciden";
      setTimeout(() => {
        this.error = ''; // Limpiar el mensaje
      }, 5000);
      return;
    }

    this.service.registerUser(this.registro).subscribe({
      next: () => {
        // Manejo de respuesta exitosa
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.error = error;
        setTimeout(() => {
          this.error = ''; // Limpiar el mensaje
        }, 5000);
      }
    });
  }

}

