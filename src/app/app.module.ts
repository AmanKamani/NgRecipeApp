import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RecipeDetailsComponent} from "./feature-recipes/recipe-details/recipe-details.component";
import {HeaderComponent} from "./header/header.component";
import {RecipeItemComponent} from "./feature-recipes/recipe-list/recipe-item/recipe-item.component";
import {RecipesListComponent} from "./feature-recipes/recipe-list/recipes-list.component";
import {RecipesComponent} from "./feature-recipes/recipes.component";
import {ShoppingListComponent} from './feature-shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './feature-shopping-list/shopping-edit/shopping-edit.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {ShoppingListService} from "./feature-shopping-list/shopping-list.service";
import {AppRoutingModule} from "./app-routing.module";
import {RecipeEditComponent} from './feature-recipes/recipe-edit/recipe-edit.component';
import {RecipeStartComponent,} from "./feature-recipes/recipe-start/recipe-start.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeItemComponent,
    RecipeDetailsComponent,
    RecipesListComponent,
    RecipeStartComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
