import {Component, OnInit} from "@angular/core";
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-recipe-details",
  templateUrl: "recipe-details.component.html",
  styleUrls: ["recipe-details.component.css"]
})
export class RecipeDetailsComponent implements OnInit {

  selectedRecipeId!: number;
  recipe!: Recipe;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedRecipeId = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.selectedRecipeId);
    })
  }

  addToShoppingList() {
    if (this.recipe !== undefined) {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.selectedRecipeId);
    this.router.navigate(['/recipes']);
  }
}
