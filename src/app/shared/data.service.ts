import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../feature-recipes/recipe.model";
import {RecipeService} from "../feature-recipes/recipe.service";
import {map, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class DataService {

  constructor(private _http: HttpClient, private _recipeService: RecipeService, private _authService: AuthService) {
  }

  saveRecipe() {
    const recipes = this._recipeService.getRecipes();
    this._http.put(environment.databaseURL, recipes).subscribe(response => console.log(response));
  }

  fetchRecipes() {
    return this._http.get<Recipe[]>(environment.databaseURL)
      .pipe(
        map(recipes => {
          if (!recipes)
            return recipes;
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
        tap(response => {
          if (response)
            this._recipeService.setRecipes(response);
        })
      );
  }
}
