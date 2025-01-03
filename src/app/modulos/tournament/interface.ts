export enum TournamentType {
  SingleElimination = "SingleElimination",
  DoubleElimination = "DoubleElimination"
}

export interface Tournament {
  id:          string;
  name:        string;
  sport:       string;
  estado:      string;
  description: string;
  rules:       string;
  users:       User[];

}

export const emptyTournament: Tournament = {
  id:          "",
  name:        "",
  sport:       "",
  estado:      "",
  description: "",
  rules:       "",
  users: [],
};

export interface User {
  id:       number;
  username: string;
  role:     string;
  name:     string;
  lastName: string;
}

export interface AddTournament {
  tournament: Tournament
  userId: string
}

export interface AddTournamentResponse{
  message: string;
  tournament: Tournament
}
