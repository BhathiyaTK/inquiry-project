import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPaySlipsComponent } from './all-pay-slips.component';

describe('AllPaySlipsComponent', () => {
  let component: AllPaySlipsComponent;
  let fixture: ComponentFixture<AllPaySlipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPaySlipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPaySlipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
