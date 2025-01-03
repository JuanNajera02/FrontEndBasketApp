import { AddTournamentResponse, emptyTournament } from "./../interface";
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AddTournament, Tournament, TournamentType } from "../interface";
import { CreateTournamentService } from "./create-tournament.service";
import { getContestTypeName } from "../utils";
import { TournamentService } from "../tournament.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-create-tournament",
  templateUrl: "./create-tournament.component.html",
  styleUrls: ["./create-tournament.component.css"]
})
export class CreateTournamentComponent implements OnInit {
  // THIS INPUT IS USED BY THE COMPONENT TO DETERMINE IF IT IS IN EDITING MODE.
  // IF UNDEFINED, IT INDICATES A NEW TOURNAMENT; OTHERWISE, IT'S FOR EDITING.
  @Input() tournament?: Tournament;

  tournamentTypes = Object.values(TournamentType); // Extract enum values
  public createTournament!: FormGroup;

  constructor(private createTournamentServ: CreateTournamentService, private tournamentServ: TournamentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    const tournament: Tournament = this.route.snapshot.parent?.data["tournamentData"];
    if (tournament) {
      this.tournament = tournament;
    }

    this.createTournament = this.createTournamentServ.createTournamentForm();
    if (this.isEditing()) {
      this.patchTournament();
    }
  }

  // IF THE INPUT TOURNAMENT IT'S NOT UNDEFINED THEN IT'S EDITING
  isEditing(): boolean {
    return this.tournament !== undefined;
  }

  patchTournament(): void {
    if (!this.tournament) return;
    this.createTournament.patchValue(this.tournament);
  }

  onSubmit(): void {
    if (this.createTournament.invalid) {
      this.createTournament.markAllAsTouched();
    }

    const newTournament: AddTournament = {
      tournament: this.createTournament.value,
      userId: "1"
    };

    if (this.isEditing()) {
      this.editTournament();
    } else {
      this.addTournament(newTournament);
    }

  }

  addTournament(tournament: AddTournament): void {

    this.tournamentServ.addTournament(tournament).subscribe({
      next: (response: AddTournamentResponse) => {
        console.log("Response:", response);
        const { tournament } = response;
        this.router.navigate(["/tournament", tournament.id]);
      },
      error: ({ error }) => {
        console.error("Error adding tournament:", error);
      }
    });
  }

  get name() {
    return this.createTournament.get("name")!;
  }

  getTournamentTypeName(tournamentType: TournamentType) {
    return getContestTypeName(tournamentType);
  }

  editTournament() {
    console.log("editing tournament");

  }

}
