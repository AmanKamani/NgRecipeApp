import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as SlActions from "../store/shopping-list.actions";
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
  editingIndex: number | undefined;
  editingIngredient: Ingredient | null = null;

  private storeSubscription!: Subscription;

  constructor(
    private shoppingService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {
  }

  ngOnInit(): void {
    // this.shoppingService.startEditing.subscribe((id: number) => {
    //   this.isEditModeEnabled = true;
    //   this.editingIndex = id;
    // this.editingIngredient = this.shoppingService.getIngredientById(id);
    // this.shoppingListForm.setValue({
    //   'name': this.editingIngredient.name,
    //   'amount': this.editingIngredient.amount
    // })
    // })

    this.storeSubscription = this.store.select("shoppingList").subscribe(stateData => {
      this.isEditModeEnabled = (!!stateData.editingIngredient && stateData.editingIngredientIndex !== -1);
      this.editingIngredient = stateData.editingIngredient;
      this.editingIndex = stateData.editingIngredientIndex;
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
      // this.shoppingService.updateIngredient(this.editingIndex!, ingredient);
      this.store.dispatch(new SlActions.UpdateIngredientAction({id: this.editingIndex!, newIngredient: ingredient}))
    else
      // this.shoppingService.addIngredient(ingredient);
      this.store.dispatch(new SlActions.AddIngredientAction(ingredient))
    this.onClear();
  }

  onDelete() {
    if (this.isEditModeEnabled && this.editingIngredient) {
      // this.shoppingService.deleteIngredient(this.editingIndex!);
      this.store.dispatch(new SlActions.DeleteIngredientAction(this.editingIndex!))
    }
    this.onClear();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.isEditModeEnabled = false;
    this.store.dispatch(new SlActions.StopEditAction());
  }

  ngOnDestroy() {
    this.store.dispatch(new SlActions.StopEditAction());
    this.storeSubscription.unsubscribe();
  }
}
