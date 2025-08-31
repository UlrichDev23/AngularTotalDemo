import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private appState: AppStateService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    if (this.appState.authState.isAuthenticated == true) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
