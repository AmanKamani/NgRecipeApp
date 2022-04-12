import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {concatMap, Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {take} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._authService.user.pipe(
      take(1),
      concatMap(user => {
        let params = new HttpParams()
        if (req.url.includes("accounts")) {
          params = params.set('key', environment.apiKey)
        } else {
          params = params.set("auth", user.token!)
        }

        let modifiedReq = req.clone({
          params: params
        });
        return next.handle(modifiedReq);
      })
    )
  }
}
