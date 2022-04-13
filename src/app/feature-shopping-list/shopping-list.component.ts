import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {State} from "./store/shopping-list.reducer";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription | undefined;

  constructor(
    private shoppingService: ShoppingListService,
    private store: Store<{ shoppingList: State }>
  ) {
  }

  ngOnInit() {
    // this.ingredients = this.shoppingService.getIngredients();
    this.ingredients = this.store.select('shoppingList');
    // this.subscription = this.shoppingService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients;
    // });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onEditItem(id: number) {
    this.shoppingService.startEditing.next(id);
  }
}
