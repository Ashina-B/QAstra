import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { featureToggleGuard } from './feature-toggle.guard';

describe('featureToggleGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => featureToggleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
