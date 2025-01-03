import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TournamentType } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class CreateTournamentService {

  createTournamentForm(): FormGroup {
    return new FormGroup({
      name: new FormControl<string>("", [
        Validators.required,
        Validators.minLength(1)
      ]),
      sport: new FormControl('football', [
        Validators.required
      ]),
      tournamentType: new FormControl<TournamentType>(TournamentType.SingleElimination, [
        Validators.required // Reglas obligatorias
      ]),
      description: new FormControl<string>('', [
        Validators.maxLength(500)
      ]),
      rules: new FormControl('', [
        Validators.maxLength(500)
      ]),
      startDate: new FormControl('', [
        Validators.required // Reglas obligatorias
      ]),
      endDate: new FormControl('', [
        Validators.required // Reglas obligatorias
      ]),
    });
  }
}
