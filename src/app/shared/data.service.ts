import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../feature-recipes/recipe.model";
import {RecipeService} from "../feature-recipes/recipe.service";
import {map, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataService {

  private static URL = "https://ng-recipes-28bb3-default-rtdb.firebaseio.com/recipes.json"

  constructor(private _http: HttpClient, private _recipeService: RecipeService, private _authService: AuthService) {
  }

  saveRecipe() {
    const recipes = this._recipeService.getRecipes();
    this._http.put(DataService.URL, recipes).subscribe(response => console.log(response));
  }

  fetchRecipes() {
    return this._http.get<Recipe[]>(DataService.URL)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
        tap(response => {
          this._recipeService.setRecipes(response);
        })
      );
  }
}
