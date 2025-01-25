import { FormControl } from "@angular/forms";

export interface AddTeamForm {
  name: FormControl<string>;
  email: FormControl<string>;
}

export interface AddPlayerToTeamForm {
  name: FormControl<string>;
  email: FormControl<string>;
  position: FormControl<string>;

}
