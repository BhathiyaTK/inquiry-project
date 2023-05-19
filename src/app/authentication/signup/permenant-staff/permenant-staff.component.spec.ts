import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermenantStaffComponent } from './permenant-staff.component';

describe('PermenantStaffComponent', () => {
  let component: PermenantStaffComponent;
  let fixture: ComponentFixture<PermenantStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermenantStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermenantStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
