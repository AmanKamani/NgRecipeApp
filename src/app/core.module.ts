import {NgModule} from "@angular/core";
import {ShoppingListService} from "./feature-shopping-list/shopping-list.service";
import {RecipeService} from "./feature-recipes/recipe.service";
import {DataService} from "./shared/data.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth/auth-interceptor.service";

@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ]
})
export class CoreModule {
}
