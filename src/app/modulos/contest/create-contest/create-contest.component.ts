import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContestType } from '../interface';
import { Test } from '../utils';

@Component({
  selector: 'app-create-contest',
  templateUrl: './create-contest.component.html',
  styleUrls: ['./create-contest.component.css']
})
export class CreateContestComponent extends Test {

  contestTypes = Object.values(ContestType); // Extract enum values

  public createTournament = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    sport: new FormControl('football', [
      Validators.required
    ]),
    contestType: new FormControl<ContestType>(ContestType.SingleElimination, [
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

  get name() {
    return this.createTournament.get('name')!;
  }

  get sport() {
    return this.createTournament.get('sport')!;
  }

  get location() {
    return this.createTournament.get('location')!;
  }

  get description() {
    return this.createTournament.get('description');
  }

  get rules() {
    return this.createTournament.get('rules')!;
  }


  display: any;

  center: google.maps.LatLngLiteral = {

      lat: 25.79302,

      lng: -108.99808

  };

  zoom = 13;


  moveMap(event: google.maps.MapMouseEvent) {

      if (event.latLng != null) this.center = (event.latLng.toJSON());

  }

  move(event: google.maps.MapMouseEvent) {

      if (event.latLng != null) this.display = event.latLng.toJSON();

  }

  onSubmit() {
    console.log("test");
    if (this.createTournament.invalid) {
      this.createTournament.markAllAsTouched()
    }

    console.log("create tournament", this.createTournament.value);
  }

}
