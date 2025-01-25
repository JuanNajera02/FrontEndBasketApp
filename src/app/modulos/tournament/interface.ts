export enum TournamentType {
  SingleElimination = "SingleElimination",
  DoubleElimination = "DoubleElimination"
}

export interface Team {
  id:   string;
  name: string;
}

export interface Tournament {
  id:          string;
  name:        string;
  sport:       string;
  estado:      string;
  description: string;
  rules:       string;
  users:       User[];
  teams:       Team[];
}

export const emptyTournament: Tournament = {
  id:          "",
  name:        "",
  sport:       "",
  estado:      "",
  description: "",
  rules:       "",
  users:       [],
  teams:       []
};

export interface User {
  id:       string;
  username: string;
  role:     "ORGANIZER" | "REFEREE";
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
