import {Component, OnDestroy, OnInit} from "@angular/core";
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: "app-recipes-list",
  templateUrl: "recipes-list.component.html",
  styleUrls: ["recipes-list.component.css"],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription!: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe((recipes) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();
  }

  onCreateNewRecipe() {
    this.router.navigate(['create'], {relativeTo: this.activatedRoute})
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
