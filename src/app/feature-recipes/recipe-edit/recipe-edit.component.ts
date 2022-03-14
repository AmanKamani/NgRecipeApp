import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Ingredient} from "../../shared/ingredient.model";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  selectedRecipeId: number = -1;
  editMode: boolean = false;

  recipeForm!: FormGroup;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  private static getIngredientFormGroup(ingredient?: Ingredient): FormGroup {
    return new FormGroup({
      'i-name': new FormControl(ingredient?.name, Validators.required),
      'i-amount': new FormControl(ingredient?.amount, [
        Validators.required,
        Validators.min(1)
      ])
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.selectedRecipeId = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  getIngredientsFormArray(): FormArray | null {
    if (this.recipeForm)
      return this.recipeForm.get('ingredients') as FormArray;
    return null;
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const ingredients = this.recipeForm.value['ingredients'].map((ingreds: { 'i-name': string, 'i-amount': string }) =>
        new Ingredient(ingreds['i-name'], +ingreds['i-amount'])
      );
      const recipe = new Recipe(
        this.recipeForm.value['name'],
        this.recipeForm.value['description'],
        this.recipeForm.value['imageUrl'],
        ingredients
      );
      if (this.editMode) {
        this.recipeService.updateRecipe(this.selectedRecipeId, recipe);
        this.router.navigate(['/recipes', this.selectedRecipeId]);
      } else {
        this.recipeService.addRecipe(recipe);
        this.router.navigate(['/recipes']);
      }
    }
  }

  onCancel() {
    window.history.back();
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      RecipeEditComponent.getIngredientFormGroup()
    );
  }

  removeIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImageUrl = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.selectedRecipeId)
      recipeName = recipe.name;
      recipeImageUrl = recipe.imagePath;
      recipeDescription = recipe.description;
      recipe.ingredients.forEach((ingredient) => {
        recipeIngredients.push(RecipeEditComponent.getIngredientFormGroup(ingredient));
      });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'imageUrl': new FormControl(recipeImageUrl, [Validators.required]),
      'description': new FormControl(recipeDescription, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      'ingredients': recipeIngredients,
    });
  }
}
