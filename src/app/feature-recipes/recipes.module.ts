import {NgModule} from "@angular/core";
import {RecipeDetailsComponent} from "./recipe-details/recipe-details.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipesListComponent} from "./recipe-list/recipes-list.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipesComponent} from "./recipes.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DropdownDirective} from "../shared/dropdown.directive";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeItemComponent,
    RecipeDetailsComponent,
    RecipeEditComponent,
    RecipesListComponent,
    RecipeStartComponent,
    DropdownDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    RecipesComponent,
    RecipeItemComponent,
    RecipeDetailsComponent,
    RecipeEditComponent,
    RecipesListComponent,
    RecipeStartComponent,
    DropdownDirective
  ]
})
export class RecipesModule {
}
