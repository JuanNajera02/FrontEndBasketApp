import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavSeasonComponent } from './side-nav-season.component';

describe('SideNavSeasonComponent', () => {
  let component: SideNavSeasonComponent;
  let fixture: ComponentFixture<SideNavSeasonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideNavSeasonComponent]
    });
    fixture = TestBed.createComponent(SideNavSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
