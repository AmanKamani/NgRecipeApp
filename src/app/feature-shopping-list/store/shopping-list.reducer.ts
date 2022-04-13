import {Ingredient} from "../../shared/ingredient.model";
import * as SlActions from "./shopping-list.actions";
import {Action} from "@ngrx/store";

const initialState = {
  ingredients: [
    new Ingredient("Bread", 2),
    new Ingredient("Butter", 1),
  ]
};

export function shoppingListReducer(
  state: { ingredients: Ingredient[] } = initialState,
  action: Action | SlActions.AddIngredientAction
) {
  switch (action.type) {
    case SlActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, (action as SlActions.AddIngredientAction).payload]
      }
    default:
      return {...state};
  }
}
