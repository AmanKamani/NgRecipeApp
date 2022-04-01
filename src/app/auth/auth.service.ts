import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

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
  private static URL = "https://identitytoolkit.googleapis.com/v1/accounts:";


  // @ts-ignore
  user = new BehaviorSubject<User>(null);

  constructor(private _http: HttpClient, private _router: Router) {
  }

  signUp(email: string, password: string) {
    return this._http.post<AuthResponseData>(AuthService.URL + "signUp", {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleErrorResponse), tap(res => {
      this.onLoginSuccess(res.localId, res.email, res.idToken, +res.expiresIn);
    }));
  }

  login(email: string, password: string) {
    return this._http.post<AuthResponseData>(AuthService.URL + "signInWithPassword", {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleErrorResponse), tap(res => {
      this.onLoginSuccess(res.localId, res.email, res.idToken, +res.expiresIn);
    }))
  }

  private onLoginSuccess(id: string, email: string, token: string, expiryDate: number) {
    const tokenExpiryDate = new Date(new Date().getTime() + expiryDate * 1000);
    const user = new User(id, email, token, tokenExpiryDate);
    this.user.next(user);
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

  logout() {
    // @ts-ignore
    this.user.next(null);
    this._router.navigate(["/auth"]);
  }
}
