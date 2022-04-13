import {Ingredient} from "../../shared/ingredient.model";
import * as SlActions from "./shopping-list.actions";
import {Action} from "@ngrx/store";

interface State {
  ingredients: Ingredient[],
  editingIngredientIndex: number,
  editingIngredient: Ingredient | null
}

export interface AppState {
  shoppingList: State
}

const initialState: State = {
  ingredients: [
    new Ingredient("Bread", 2),
    new Ingredient("Butter", 1),
  ],
  editingIngredientIndex: -1,
  editingIngredient: null,
};

export function shoppingListReducer(
  state: State = initialState,
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
      const newIngredient = (action as SlActions.UpdateIngredientAction).payload;
      const ings = [...state.ingredients];
      ings[state.editingIngredientIndex] = newIngredient;
      return {
        ...state,
        ingredients: ings,
        editingIngredientIndex: -1,
        editingIngredient: null,
      };
    case SlActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, igIndex) => igIndex !== state.editingIngredientIndex)
      };
    case SlActions.START_EDIT:
      const editId = (action as SlActions.StartEditAction).payload;
      return {
        ...state,
        editingIngredientIndex: editId,
        editingIngredient: {...state.ingredients[editId]}
      };
    case SlActions.STOP_EDIT:
      return {
        ...state,
        editingIngredientIndex: -1,
        editingIngredient: null
      };
    default:
      return {...state};
  }
}
