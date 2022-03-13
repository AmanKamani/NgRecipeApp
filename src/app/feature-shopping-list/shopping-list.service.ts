import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient("Bread", 2),
    new Ingredient("Butter", 1)
  ];

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.raiseIngredientChange();
  }

  getIngredientById(id: number): Ingredient {
    return this.ingredients[id];
  }

  addIngredientList(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.raiseIngredientChange()
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  updateIngredient(id: number, newIngredient: Ingredient) {
    this.ingredients.splice(id, 1, newIngredient)
    this.raiseIngredientChange()
  }

  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.raiseIngredientChange();
  }

  private raiseIngredientChange() {
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}
