import {Action} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const UPDATE_INGREDIENT = "UPDATE_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";


// createAction(ADD_INGREDIENT, props<{payload: Ingredient}>())

export class AddIngredientAction implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}

export class AddIngredientsAction implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {
  }
}

export class UpdateIngredientAction implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: { id: number, newIngredient: Ingredient }) {
  }
}

export class DeleteIngredientAction implements Action {
  readonly type = DELETE_INGREDIENT;

  constructor(public payload: number) {
  }
}

export type ShoppingListActions =
  AddIngredientAction
  | AddIngredientsAction
  | UpdateIngredientAction
  | DeleteIngredientAction;
