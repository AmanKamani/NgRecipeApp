import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "./user.model";
import {Router} from "@angular/router";
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
      this._store.dispatch(fromAuthActions.authSuccess({
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

  autoLogout(expireDuration: number) {
    this._tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expireDuration);
  }
}
