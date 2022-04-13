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
  action: Action | SlActions.ShoppingListActions
) {
  switch (action.type) {
    case SlActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, (action as SlActions.AddIngredientAction).payload]
      };
    case SlActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...(action as SlActions.AddIngredientsAction).payload]
      };
    case SlActions.UPDATE_INGREDIENT:
      const payload = (action as SlActions.UpdateIngredientAction).payload;
      const ings = [...state.ingredients];
      ings[payload.id] = payload.newIngredient;
      return {
        ...state,
        ingredients: ings
      };
    case SlActions.DELETE_INGREDIENT:
      const index = ((action as SlActions.DeleteIngredientAction).payload);
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, igIndex) => igIndex !== index)
      };
    default:
      return {...state};
  }
}
