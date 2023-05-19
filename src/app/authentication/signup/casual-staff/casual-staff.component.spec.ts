import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasualStaffComponent } from './casual-staff.component';

describe('CasualStaffComponent', () => {
  let component: CasualStaffComponent;
  let fixture: ComponentFixture<CasualStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasualStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasualStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
