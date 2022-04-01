import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";
import {AlertComponent} from "../shared/alert/alert.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: any = null;
  @ViewChild(PlaceholderDirective) hostContainerRef!: PlaceholderDirective;
  errorCloseSubscription: Subscription | undefined;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {
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
      this.createAndShowErrorDialog(errorMessage);
    })
  }

  private resetForm(form: NgForm) {
    form.reset();
    this.isLoading = false;
    this.error = null;
  }

  ngOnDestroy() {
    if (this.errorCloseSubscription)
      this.errorCloseSubscription.unsubscribe();
  }

  handleOnErrorClose() {
    this.error = null;
  }

  private createAndShowErrorDialog(errorMessage: string) {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.hostContainerRef.viewContainerRef;
    hostViewContainerRef.clear();

    const alertComponentRef = hostViewContainerRef.createComponent(componentFactory);
    alertComponentRef.instance.message = errorMessage;
    this.errorCloseSubscription = alertComponentRef.instance.close.subscribe(() => {
      this.errorCloseSubscription?.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

}
