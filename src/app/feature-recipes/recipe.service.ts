import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../feature-shopping-list/shopping-list.service";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {AddIngredientsAction} from "../feature-shopping-list/store/shopping-list.actions";
import {State} from "../feature-shopping-list/store/shopping-list.reducer";

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Bread Butter",
  //     "This is a bread item",
  //     "data:image/jpeg;base64,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",
  //     [
  //       new Ingredient("Bread", 2),
  //       new Ingredient("Butter", 1)
  //     ]
  //   ),
  //   new Recipe("Tea",
  //     "This is a hot drink.",
  //     "data:image/jpeg;base64,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",
  //     [
  //       new Ingredient("Water (1/2 cup)", 1),
  //       new Ingredient("Milk", 1),
  //       new Ingredient("Tea Leaves (Spoon)", 1),
  //       new Ingredient("Sugar (Spoon)", 1),
  //     ]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: State }>
  ) {
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index]
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredientList(ingredients);
    this.store.dispatch(new AddIngredientsAction(ingredients));
    this.raiseOnRecipeChanged();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.raiseOnRecipeChanged();
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.raiseOnRecipeChanged();
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.raiseOnRecipeChanged();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.raiseOnRecipeChanged();
  }

  private raiseOnRecipeChanged() {
    this.recipesChanged.next(this.recipes.slice())
  }
}
