import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AddPlayerTokenGuard } from './add-player-token.guard';

describe('addPlayerTokenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => AddPlayerTokenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
