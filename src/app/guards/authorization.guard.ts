import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Injectable()
export class AuthorizationGuard {
  constructor(private appState: AppStateService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    /*if (this.appState.authState.roles.includes('ADMIN')) {
      return true;
    } else {
      this.router.navigateByUrl('/admin/notAuthorized');
      return false;
    }*/

    if (this.appState.authState.roles.includes(route.data['requiredRoles'])) {
      return true;
    } else {
      this.router.navigateByUrl('/admin/notAuthorized');
      return false;
    }
  }
}
