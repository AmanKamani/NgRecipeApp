import {Component, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AddIngredientAction, DeleteIngredientAction, UpdateIngredientAction} from "../store/shopping-list.actions";
import {State} from "../store/shopping-list.reducer";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f') shoppingListForm!: NgForm;

  isEditModeEnabled = false;
  editingIndex: number | undefined;
  editingIngredient: Ingredient | undefined;

  constructor(
    private shoppingService: ShoppingListService,
    private store: Store<{ shoppingList: State }>
  ) {
  }

  ngOnInit(): void {
    this.shoppingService.startEditing.subscribe((id: number) => {
      this.isEditModeEnabled = true;
      this.editingIndex = id;
      // this.editingIngredient = this.shoppingService.getIngredientById(id);
      // this.shoppingListForm.setValue({
      //   'name': this.editingIngredient.name,
      //   'amount': this.editingIngredient.amount
      // })

      this.store.select('shoppingList').subscribe(list => {
        this.editingIngredient = list.ingredients[id];
        this.shoppingListForm.setValue({
          'name': this.editingIngredient.name,
          'amount': this.editingIngredient.amount
        })
      })
    })
  }

  onItemAdd(form: NgForm) {
    const formValue = form.value;
    const ingredient = new Ingredient(formValue.name, formValue.amount);
    if (this.isEditModeEnabled)
      // this.shoppingService.updateIngredient(this.editingIndex!, ingredient);
      this.store.dispatch(new UpdateIngredientAction({id: this.editingIndex!, newIngredient: ingredient}))
    else
      // this.shoppingService.addIngredient(ingredient);
      this.store.dispatch(new AddIngredientAction(ingredient))
    this.onClear();
  }

  onDelete() {
    if (this.isEditModeEnabled && this.editingIngredient) {
      // this.shoppingService.deleteIngredient(this.editingIndex!);
      this.store.dispatch(new DeleteIngredientAction(this.editingIndex!))
    }
    this.onClear();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.isEditModeEnabled = false;
  }
}
