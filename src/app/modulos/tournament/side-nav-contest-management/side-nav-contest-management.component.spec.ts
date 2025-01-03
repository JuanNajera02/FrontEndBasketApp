import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavContestManagementComponent } from './side-nav-contest-management.component';

describe('SideNavContestManagementComponent', () => {
  let component: SideNavContestManagementComponent;
  let fixture: ComponentFixture<SideNavContestManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideNavContestManagementComponent]
    });
    fixture = TestBed.createComponent(SideNavContestManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
