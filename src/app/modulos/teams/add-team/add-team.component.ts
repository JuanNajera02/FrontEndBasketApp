import { Component, Inject, Input } from "@angular/core";
import { OnInit } from "@angular/core";
import { TemporadasService } from "../../admin-ligas/adminLigasService/temporadas.service";
import { TeamService } from "../teamService/team.service";
import { ActivatedRoute } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AddTeamForm } from "../interfaces";
import { Team } from "../../tournament/interface";
import { authService } from "src/app/services/authenticateService/auth.service";

// MODAL FOR ADDING A TEAM TO A TOURNAMENT
@Component({
  selector: "app-add-team",
  templateUrl: "./add-team.component.html",
  styleUrls: ["./add-team.component.css"]
})
export class AddTeamComponent implements OnInit {

  constructor(
    private teamServ: TeamService,
    private authServ:authService,
    @Inject(MAT_DIALOG_DATA) public data: { tournamentId: string },
    private dialogRef: MatDialogRef<AddTeamComponent>
  ) { }

  equipos: string[] = [];
  mensaje: string = "";
  selectedEquipo: string = "";
  public addTeamForm: FormGroup<AddTeamForm> = this.teamServ.createAddTeamForm()


  ngOnInit(): void {

    // this.obtenerEquiposSinTemporada(this.temporadaId);

    // this.tempService.onNuevoEquipoAsignado().subscribe({
    //   next: () => {
    //     this.equipos = [];
    //     this.obtenerEquiposSinTemporada(this.temporadaId);
    //   }
    // });

  }

  addTeam(): void {
    const teamToAdd:Team = this.mapAddTeamFormToTeam(this.addTeamForm)
    this.teamServ.addTeam(teamToAdd,this.data.tournamentId,this.authServ.getUserId()).subscribe({
      next:(res) => console.log("res",res)
    })
    console.log(this.addTeamForm.value)
  }

  mapAddTeamFormToTeam(addTeamForm: FormGroup<AddTeamForm>): Team {
    const { name, email } = addTeamForm.value
    const team: Team = {
      id: "",
      name: name ?? "",
    }
    return team
  }

  closeModal() {
    this.dialogRef.close()
  }
  // agregarEquipoTemp(tempId: number, nombreEquipo: string) {

  //   this.tempService.asignarEquipoATemporada(tempId, nombreEquipo).subscribe({
  //     next: () => {
  //       this.mensaje = "Equipo agregado correctamente";
  //       this.selectedEquipo = '';
  //       this.tempService.emitNuevoEquipoAsignado();
  //     },
  //     error: () => {
  //       if(nombreEquipo == '')
  //         this.mensaje = "Seleccione un equipo";
  //     }
  //   });
  // }

  // obtenerEquiposSinTemporada(idTemporada: number) {
  //   this.tempService.obtenerEquiposNoEnTemporada(idTemporada).subscribe({
  //     next: (result) => {
  //       result.forEach((element: any) => {
  //         this.equipos.push(element);
  //       })
  //     }
  //   });
  // }

}

