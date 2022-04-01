import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: any = null;

  constructor(private _authService: AuthService, private _router: Router) {
  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid)
      return;
    this.isLoading = true;
    const email = form.value.email!
    const password = form.value.password!
    let observeResponse: Observable<AuthResponseData>;
    console.log(email + password)
    if (this.isLoginMode) {
      observeResponse = this._authService.login(email, password)
    } else {
      observeResponse = this._authService.signUp(email, password)
    }

    observeResponse.subscribe(response => {
      console.log(response);
      this._router.navigate(["/recipes"])
      this.resetForm(form);
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    })
  }

  private resetForm(form: NgForm) {
    form.reset();
    this.isLoading = false;
    this.error = null;
  }
}
