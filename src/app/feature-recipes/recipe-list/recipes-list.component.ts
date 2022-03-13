import {Component, OnInit} from "@angular/core";
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-recipes-list",
  templateUrl: "recipes-list.component.html",
  styleUrls: ["recipes-list.component.css"],
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onCreateNewRecipe() {
    this.router.navigate(['create'], {relativeTo: this.activatedRoute})
  }
}
