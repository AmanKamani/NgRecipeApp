import {Component, OnInit} from "@angular/core";
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-recipe-details",
  templateUrl: "recipe-details.component.html",
  styleUrls: ["recipe-details.component.css"]
})
export class RecipeDetailsComponent implements OnInit {

  recipe!: Recipe;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log(`=> ngOnInit = details`)
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      console.log(`=> from detail = ${id}`)
      this.recipe = this.recipeService.getRecipe(id);
    })
  }

  addToShoppingList() {
    if (this.recipe !== undefined) {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }
  }
}
