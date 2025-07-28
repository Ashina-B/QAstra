import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  hasUnsavedChanges: boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute, currentState, nextState) => {
  return component.hasUnsavedChanges ? confirm('You have unsaved changes. Do you really want to leave?') : true;
};
