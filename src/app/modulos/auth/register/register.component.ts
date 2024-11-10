import { Component  } from "@angular/core";
import { SignUp, Password } from "../../../models/Login/Register";
import { Router } from "@angular/router";
import { authService } from "src/app/services/authenticateService/auth.service";
import { Gender } from "../../../models/Login/Gender";
import { Role } from "../../../models/Login/Role";
import {FormGroup, FormControl} from "@angular/forms";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {

  signupForm = new FormGroup({
    usuario: new FormControl<string>(""),
    nombre: new FormControl<string>(""),
    apellido: new FormControl<string>(""),
    email: new FormControl<string>(""),
    password: new FormControl<string>(""),
    rol: new FormControl<Role>(Role.ANONIMO),
  });
  
  error: any;
  repeatedPassword = new FormControl("");

  constructor(
    private service: authService,
    private router: Router
  ) { }

  signUp() {
    //valida si las 2 contraseñas son iguales

    if (this.signupForm.get("password")?.value !== this.repeatedPassword.value) {
      this.error = "Las contraseñas no coinciden";
      setTimeout(() => {
        this.error = ""; // Limpiar el mensaje
      }, 5000);
      return;
    }

    this.service.registerUser(this.signupForm.value).subscribe({
      next: () => {
        // Manejo de respuesta exitosa
        this.router.navigate(["/home"]);
      },
      error: (error) => {
        this.error = error;
        setTimeout(() => {
          this.error = ""; // Limpiar el mensaje
        }, 5000);
      }
    });
  }

}

