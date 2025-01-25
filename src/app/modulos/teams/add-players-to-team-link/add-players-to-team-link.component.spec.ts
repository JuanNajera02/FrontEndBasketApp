import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayersToTeamLinkComponent } from './add-players-to-team-link.component';

describe('AddPlayersToTeamLinkComponent', () => {
  let component: AddPlayersToTeamLinkComponent;
  let fixture: ComponentFixture<AddPlayersToTeamLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPlayersToTeamLinkComponent]
    });
    fixture = TestBed.createComponent(AddPlayersToTeamLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
