import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataService} from "../shared/data.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

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
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this._userSubscription = this._authService.user.subscribe(user => {
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
