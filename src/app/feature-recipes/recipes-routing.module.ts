import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {RecipesResolverService} from "./recipes-resolver.service";
import {AuthGuard} from "../auth/auth.guard";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailsComponent} from "./recipe-details/recipe-details.component";

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    resolve: [RecipesResolverService],
    canActivate: [AuthGuard],
    children: [
      {path: '', component: RecipeStartComponent},
      {path: 'create', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailsComponent},
      {path: ':id/edit', component: RecipeEditComponent},
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule {
}
