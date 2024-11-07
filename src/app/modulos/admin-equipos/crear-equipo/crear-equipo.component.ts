import { Component } from '@angular/core';
import { EquiposService } from '../EquiposService/equipos.service';
import { Equipo } from '../interfacesEquipos/Equipos';
import { Categoria } from '../interfacesEquipos/Equipos';
import { Rama } from '../interfacesEquipos/Equipos';

@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.component.html',
  styleUrls: ['./crear-equipo.component.css']
})
export class CrearEquipoComponent{

  mensaje: string = '';
  equipo: Equipo = {
    nombre: '',
    admin_equipo: localStorage.getItem('usuario') as string,
    rama: Rama.MASCULINO,
    categoria: Categoria.SENIOR
  }

  categorias: string[] = Object.values(Categoria)
  .filter(value => typeof value === 'string')
  .map(value => value as string);

  ramas: string[] = Object.values(Rama)
  .filter(value => typeof value === 'string')
  .map(value => value as string);

  constructor(private equiposService: EquiposService) {}

  crearEquipo() {
    console.log(this.equipo);
    this.equiposService.crearEquipo(this.equipo).subscribe({
      next: (result) => {
        this.mensaje = result.message;
        this.equiposService.emitNuevoEquipoCreado();
      },
      error: (error) => {
        this.mensaje = error.error[0].message;
      }
    });
  }

}
