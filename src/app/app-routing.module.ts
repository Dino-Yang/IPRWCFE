import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollectionsComponent} from "./collections/collections.component";
import {AboutComponent} from "./about/about.component";
import {DetailComponent} from "./detail/detail.component";
import {LoginComponent} from "./login/login.component";
import {AccountComponent} from "./account/account.component";
import {CreateComponent} from "./login/create/create.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {DetailsComponent} from "./account/details/details.component";
import {CartPageComponent} from "./cart/cart-page/cart-page.component";
import {AdminComponent} from "./admin/admin.component";
import {MainComponent} from "./main/main.component";
import {ThankyouComponent} from "./thankyou/thankyou.component";

const routes: Routes = [
  {path: 'collections', component: CollectionsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'products/:productId', component: DetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account', component: AccountComponent},
  {path: 'register', component: CreateComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'userDetails', component: DetailsComponent},
  {path: 'cart', component: CartPageComponent},
  {path: 'admin', component: AdminComponent},
  {path: '', component: MainComponent},
  {path: 'thankyou', component: ThankyouComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
