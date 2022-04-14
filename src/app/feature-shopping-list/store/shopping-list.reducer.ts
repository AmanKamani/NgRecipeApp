import {Ingredient} from "../../shared/ingredient.model";
import {
  addIngredientAction,
  addIngredientsAction,
  deleteIngredientAction,
  startEditIgAction,
  stopEditIgAction,
  updateIngredientAction
} from "./shopping-list.actions";
import {createReducer, on} from "@ngrx/store";

export interface State {
  ingredients: Ingredient[],
  editingIngredientIndex: number,
  editingIngredient: Ingredient | null
}

const initialState: State = {
  ingredients: [
    new Ingredient("Bread", 2),
    new Ingredient("Butter", 1),
  ],
  editingIngredientIndex: -1,
  editingIngredient: null,
};

export const shoppingListReducer = createReducer(initialState,
  on(addIngredientAction, (state, {ingredient}) => ({
    ...state,
    ingredients: [...state.ingredients, ingredient]
  })),
  on(addIngredientsAction, (state, {ingredients}) => ({
    ...state,
    ingredients: [...state.ingredients, ...ingredients]
  })),
  on(updateIngredientAction, (state, {ingredient}) => {
    const ings = [...state.ingredients]
    ings[state.editingIngredientIndex] = ingredient
    return ({...state, ingredients: ings})
  }),
  on(deleteIngredientAction, (state) => {
    const ings = state.ingredients.filter((_, index) => index !== state.editingIngredientIndex)
    return ({...state, ingredients: ings})
  }),
  on(stopEditIgAction, (state) => ({
    ...state,
    editingIngredientIndex: -1,
    editingIngredient: null
  })),
  on(startEditIgAction, (state, {index}) => ({
    ...state,
    editingIngredientIndex: index,
    editingIngredient: {...state.ingredients[index]}
  }))
)
