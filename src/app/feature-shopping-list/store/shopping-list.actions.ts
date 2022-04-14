import {createAction, props} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

const feature = "[Shopping List]"
export const addIngredientAction = createAction(`${feature} Add Ingredient`, props<{ ingredient: Ingredient }>());
export const addIngredientsAction = createAction(`${feature} Add Ingredients`, props<{ ingredients: Ingredient[] }>());
export const updateIngredientAction = createAction(`${feature} Add Ingredient`, props<{ ingredient: Ingredient }>());
export const deleteIngredientAction = createAction(`${feature} Delete Ingredient`);
export const startEditIgAction = createAction(`${feature} Start Edit`, props<{ index: number }>());
export const stopEditIgAction = createAction(`${feature} Stop Edit`);
