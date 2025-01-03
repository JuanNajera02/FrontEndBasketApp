import { ResolveFn } from '@angular/router';
import { Tournament } from '../interface';
import { inject } from '@angular/core';
import { TournamentService } from '../tournament.service';

export const tournamentResolver: ResolveFn<Tournament> = (route, state) => {
  const tournamentId = route.paramMap.get('tournamentId');
  const tournamentServ = inject(TournamentService)
  return tournamentServ.getTournamentById(tournamentId!)
};
