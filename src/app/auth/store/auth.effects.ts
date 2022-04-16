import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {authFailed, authSuccess, loginStart, signupStart} from "./auth.actions";
import {environment} from "../../../environments/environment";
import {catchError, exhaustMap, map, tap} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  localId: string;
  expiresIn: string;
  refreshToken: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {

  authLogin = createEffect(() => this.actions$.pipe(
    ofType(loginStart),
    exhaustMap((authData) => {
        return this._http.post<AuthResponseData>(environment.authURLPrefix + "signInWithPassword", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        }).pipe(
          map(response => {
            const tokenExpireDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
            return authSuccess({
              id: response.localId,
              email: response.email,
              token: response.idToken,
              tokenExpiryDate: tokenExpireDate
            });
          }),
          catchError((errorRes) => AuthEffects.handleErrorResponse(errorRes))
        )
      }
    ),
  ));

  authSignup = createEffect(() => this.actions$.pipe(
    ofType(signupStart),
    exhaustMap((authData) => {
      return this._http.post<AuthResponseData>(environment.authURLPrefix + "signUp", {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }).pipe(
        map((response) => {
          const tokenExpireDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
          return authSuccess({
            id: response.localId,
            email: response.email,
            token: response.idToken,
            tokenExpiryDate: tokenExpireDate
          });
        }),
        catchError(AuthEffects.handleErrorResponse)
      );
    }),
  ))

  authSuccess = createEffect(() => this.actions$.pipe(
    ofType(authSuccess),
    tap(() => this.router.navigate(["/"]))
  ), {dispatch: false})

  constructor(private actions$: Actions, private _http: HttpClient, private router: Router) {
  }

  private static handleErrorResponse(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!"
    if (!errorRes.error || !errorRes.error.error)
      return of(authFailed({error: errorMessage}))
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This Email already exists!"
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email is not registered!"
        break;
      case "INVALID_PASSWORD":
        errorMessage = "Invalid Password"
        break;
    }
    return of(authFailed({error: errorMessage}))
  }

}
