import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./feature-recipes/recipes.component";
import {ShoppingListComponent} from "./feature-shopping-list/shopping-list.component";
import {RecipeDetailsComponent} from "./feature-recipes/recipe-details/recipe-details.component";
import {RecipeEditComponent} from "./feature-recipes/recipe-edit/recipe-edit.component";
import {RecipeStartComponent} from "./feature-recipes/recipe-start/recipe-start.component";
import {RecipesResolverService} from "./feature-recipes/recipes-resolver.service";
import {AuthComponent} from "./auth/auth.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {
    path: 'recipes',
    component: RecipesComponent,
    resolve: [RecipesResolverService],
    children: [
      {path: '', component: RecipeStartComponent},
      {path: 'create', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailsComponent},
      {path: ':id/edit', component: RecipeEditComponent},
    ]
  },
  {path: 'auth', component: AuthComponent},
  {path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
