import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map, take} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private _store: Store<AppState>, private _router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      map(user => {
        const isAuthenticated = !!user;
        if (isAuthenticated)
          return true;
        else
          return this._router.createUrlTree(["/auth"]);
      }));
  }
}
