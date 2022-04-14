import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import * as fromAuthActions from "./store/auth.actions";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  localId: string;
  expiresIn: string;
  refreshToken: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private static USER_DATA_KEY = "userData";
  private _tokenExpirationTimer: any;

  // @ts-ignore
  // user = new BehaviorSubject<User>(null);

  constructor(private _http: HttpClient,
              private _router: Router,
              private _store: Store<AppState>
  ) {
  }

  signUp(email: string, password: string) {
    return this._http.post<AuthResponseData>(environment.authURLPrefix + "signUp", {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleErrorResponse), tap(res => {
      this.onLoginSuccess(res.localId, res.email, res.idToken, +res.expiresIn);
    }));
  }

  login(email: string, password: string) {
    return this._http.post<AuthResponseData>(environment.authURLPrefix + "signInWithPassword", {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleErrorResponse), tap(res => {
      this.onLoginSuccess(res.localId, res.email, res.idToken, +res.expiresIn);
    }))
  }

  autoLogin() {
    const data = localStorage.getItem(AuthService.USER_DATA_KEY);
    if (!data)
      return;
    const userParsed: {
      id: string,
      email: string,
      _token: string,
      _tokenExpiryDate: string
    } = JSON.parse(data);
    const tokenExpireDate = new Date(userParsed._tokenExpiryDate);
    const user = new User(userParsed.id, userParsed.email, userParsed._token, tokenExpireDate);
    if (user.token) {
      const expirationDuration = tokenExpireDate.getTime() - new Date().getTime()
      this.autoLogout(expirationDuration);
      // this.user.next(user)
      this._store.dispatch(fromAuthActions.login({
        id: userParsed.id,
        email: userParsed.email,
        token: userParsed._token,
        tokenExpiryDate: tokenExpireDate
      }))
    }
  }

  logout() {
    // @ts-ignore
    // this.user.next(null)
    this._store.dispatch(fromAuthActions.logout());
    this._router.navigate(["/auth"]);
    localStorage.removeItem(AuthService.USER_DATA_KEY);
    if (this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer);
      this._tokenExpirationTimer = null;
    }
  }

  private handleErrorResponse(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!"
    if (!errorRes.error || !errorRes.error.error)
      throwError(errorMessage)
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
    return throwError(errorMessage)
  }

  autoLogout(expireDuration: number) {
    this._tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expireDuration);
  }

  private onLoginSuccess(id: string, email: string, token: string, expiryDate: number) {
    const tokenExpiryDate = new Date(new Date().getTime() + expiryDate * 1000);
    const user = new User(id, email, token, tokenExpiryDate);
    this.autoLogout(expiryDate * 1000);
    // this.user.next(user);
    this._store.dispatch(fromAuthActions.login({
      id: id,
      email: email,
      token: token,
      tokenExpiryDate: tokenExpiryDate
    }));
    localStorage.setItem(AuthService.USER_DATA_KEY, JSON.stringify(user));
  }
}
