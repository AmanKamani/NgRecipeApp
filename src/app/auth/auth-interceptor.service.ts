import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {concatMap, Observable, tap} from "rxjs";
import {AuthService} from "./auth.service";
import {map, take} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService, private _store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._store.select("auth").pipe(
      take(1),
      map(authState => authState.user),
      concatMap(user => {
        let params = new HttpParams()
        if (req.url.includes("accounts")) {
          params = params.set('key', environment.apiKey)
        } else {
          params = params.set("auth", user!.token!)
        }

        let modifiedReq = req.clone({
          params: params
        });
        return next.handle(modifiedReq).pipe(tap(_ => {
        }, error => {
          console.log(`Error Occurred => ${error}`);
        }));
      })
    )
  }
}
