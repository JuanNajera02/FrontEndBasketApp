import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  // Import 'of' to return an observable of 'false'
import { catchError, map } from 'rxjs/operators';
import { LinkService } from '../services/linkService/link.service';

export const AddPlayerTokenGuard: CanActivateFn = (route, state) => {
  const linkServ = inject(LinkService);
  const { teamId, token } = route.params;
  const tournamentId = route.parent?.params['tournamentId'];
  const router = inject(Router);

  return linkServ.validateLink(teamId, tournamentId, token).pipe(
    map((res) => {
      return true;
    }),
    catchError((error: HttpErrorResponse) => {
      // If the token is invalid, return false to block navigation
      console.log('Token is invalid -> ', error.error.message);
      router.navigate([`tournament/${tournamentId}/invalid`])
      .catch(() => {
        router.navigate(['invalid']);
      }
      );

      return of(false);  // Return an observable of false to prevent navigation
    })
  );
};
