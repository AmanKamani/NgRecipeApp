import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'recipes',
    loadChildren: () =>
      import("./feature-recipes/recipes.module")
        .then(module => module.RecipesModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import("./feature-shopping-list/shopping-list.module")
        .then(module => module.ShoppingListModule)
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
