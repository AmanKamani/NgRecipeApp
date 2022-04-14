import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import {
  addIngredientAction,
  deleteIngredientAction,
  stopEditIgAction,
  updateIngredientAction
} from "../store/shopping-list.actions";
import * as fromShoppingList from "../store/shopping-list.reducer";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') shoppingListForm!: NgForm;

  isEditModeEnabled = false;
  editingIngredient: Ingredient | null = null;

  private storeSubscription!: Subscription;

  constructor(
    private store: Store<fromShoppingList.AppState>
  ) {
  }

  ngOnInit(): void {
    this.storeSubscription = this.store.select("shoppingList").subscribe(stateData => {
      this.isEditModeEnabled = (!!stateData.editingIngredient && stateData.editingIngredientIndex !== -1);
      this.editingIngredient = stateData.editingIngredient;
      if (this.editingIngredient) {
        this.shoppingListForm.setValue({
          name: this.editingIngredient.name,
          amount: this.editingIngredient.amount
        })
      }
    })
  }

  onItemAdd(form: NgForm) {
    const formValue = form.value;
    const ingredient = new Ingredient(formValue.name, formValue.amount);
    if (this.isEditModeEnabled)
      this.store.dispatch(updateIngredientAction({ingredient}))
    else
      this.store.dispatch(addIngredientAction({ingredient}))
    this.onClear();
  }

  onDelete() {
    if (this.isEditModeEnabled && this.editingIngredient) {
      this.store.dispatch(deleteIngredientAction())
    }
    this.onClear();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.isEditModeEnabled = false;
    this.store.dispatch(stopEditIgAction());
  }

  ngOnDestroy() {
    this.store.dispatch(stopEditIgAction());
    this.storeSubscription.unsubscribe();
  }
}
