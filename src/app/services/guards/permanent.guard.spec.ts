import { TestBed } from '@angular/core/testing';

import { PermanentGuard } from './permanent.guard';

describe('PermanentGuard', () => {
  let guard: PermanentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermanentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
