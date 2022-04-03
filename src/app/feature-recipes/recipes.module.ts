import {NgModule} from "@angular/core";
import {RecipeDetailsComponent} from "./recipe-details/recipe-details.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipesListComponent} from "./recipe-list/recipes-list.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipesComponent} from "./recipes.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeItemComponent,
    RecipeDetailsComponent,
    RecipeEditComponent,
    RecipesListComponent,
    RecipeStartComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
  ],
})
export class RecipesModule {
}
