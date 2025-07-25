import { CanMatchFn } from '@angular/router';

export const featureToggleGuard: CanMatchFn = (route, segments) => {
  return true;
};
