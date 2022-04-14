import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataService} from "../shared/data.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {map} from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private _userSubscription!: Subscription;

  constructor(
    private _dataService: DataService,
    private _authService: AuthService,
    private _router: Router,
    private _store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this._userSubscription = this._store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveRecipe() {
    this._dataService.saveRecipe();
  }

  onFetchRecipes() {
    this._dataService.fetchRecipes();
  }

  ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
  }

  onLogout() {
    this._authService.logout();
  }
}
