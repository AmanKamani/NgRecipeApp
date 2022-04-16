import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";
import {AlertComponent} from "../shared/alert/alert.component";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {loginStart, signupStart} from "./store/auth.actions";

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
    private _router: Router,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this._store.select("auth").subscribe(authState => {
      this.isLoading = authState.isLoading
      this.error = authState.authError
      if (this.error) {
        this.createAndShowErrorDialog(this.error);
      }
    });
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
    if (this.isLoginMode) {
      this._store.dispatch(loginStart({email, password}))
    } else {
      this._store.dispatch(signupStart({email, password}));
    }
    this.resetForm(form);
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
