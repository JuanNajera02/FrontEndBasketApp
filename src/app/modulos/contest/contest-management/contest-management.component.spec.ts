import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestManagementComponent } from './contest-management.component';

describe('ContestManagementComponent', () => {
  let component: ContestManagementComponent;
  let fixture: ComponentFixture<ContestManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestManagementComponent]
    });
    fixture = TestBed.createComponent(ContestManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
