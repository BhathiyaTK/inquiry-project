import { TestBed } from '@angular/core/testing';

import { CasualGuard } from './casual.guard';

describe('CasualGuard', () => {
  let guard: CasualGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CasualGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
