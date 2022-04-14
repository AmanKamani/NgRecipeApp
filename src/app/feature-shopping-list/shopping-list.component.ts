import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromShoppingList from "./store/shopping-list.reducer";
import {startEditIgAction} from "./store/shopping-list.actions";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription | undefined;

  constructor(
    private store: Store<fromShoppingList.AppState>
  ) {
  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onEditItem(id: number) {
    this.store.dispatch(startEditIgAction({index: id}));
  }
}
