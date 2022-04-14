import {createAction, props} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const UPDATE_INGREDIENT = "UPDATE_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const START_IG_EDIT = "START_IG_EDIT";
export const STOP_IG_EDIT = "STOP_IG_EDIT";


export const addIngredientAction = createAction(ADD_INGREDIENT, props<{ ingredient: Ingredient }>());
export const addIngredientsAction = createAction(ADD_INGREDIENTS, props<{ ingredients: Ingredient[] }>());
export const updateIngredientAction = createAction(UPDATE_INGREDIENT, props<{ ingredient: Ingredient }>());
export const deleteIngredientAction = createAction(DELETE_INGREDIENT);
export const startEditIgAction = createAction(START_IG_EDIT, props<{ index: number }>());
export const stopEditIgAction = createAction(STOP_IG_EDIT);
