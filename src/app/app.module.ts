import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AboutComponent} from './about/about.component';
import {DetailModule} from "./detail/detail.module";
import {CollectionsModule} from "./collections/collections.module";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {CartComponent} from './cart/cart.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarModule} from "./navbar/navbar.module";
import {RouterModule} from "@angular/router";
import {SharedModule} from "./shared/shared.module";
import {ToastComponent} from './toast/toast.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {AccountComponent} from './account/account.component';
import {AccountModule} from "./account/account.module";
import {LoginComponent} from './login/login.component';
import {CreateComponent} from './login/create/create.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CheckoutComponent} from './checkout/checkout.component';
import {CartPageComponent} from './cart/cart-page/cart-page.component';
import {AdminComponent} from './admin/admin.component';
import {ProductsComponent} from './admin/products/products.component';
import {OrdersComponent} from './admin/orders/orders.component';
import {UsersComponent} from './admin/users/users.component';
import {AdminModule} from "./admin/admin.module";
import {MainComponent} from './main/main.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSelectModule} from "@angular/material/select";
import { ThankyouComponent } from './thankyou/thankyou.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CartComponent,
    ToastComponent,
    AccountComponent,
    LoginComponent,
    CreateComponent,
    CheckoutComponent,
    CartPageComponent,
    MainComponent,
    ThankyouComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DetailModule,
    CollectionsModule,
    BrowserAnimationsModule,
    NgbModule,
    NavbarModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    MatIconModule,
    AccountModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AdminModule,
    MatButtonToggleModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
