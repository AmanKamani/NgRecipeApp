import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {map, take} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authService.user.pipe(
      take(1),
      map(user => {
        const isAuthenticated = !!user;
        if (isAuthenticated)
          return true;
        else
          return this._router.createUrlTree(["/auth"]);
      }));
  }
}
