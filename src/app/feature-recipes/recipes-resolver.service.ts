import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {DataService} from "../shared/data.service";
import {Observable} from "rxjs";
import {RecipeService} from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private _dataService: DataService, private _recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes = this._recipeService.getRecipes();
    if (recipes.length === 0) {
      return this._dataService.fetchRecipes()
    } else
      return recipes;
  }
}
