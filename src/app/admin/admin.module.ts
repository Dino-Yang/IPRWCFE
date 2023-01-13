import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersComponent} from "./orders/orders.component";
import {ProductsComponent} from "./products/products.component";
import {UsersComponent} from "./users/users.component";
import {AdminComponent} from "./admin.component";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {OrderDetailComponent} from './orders/order-detail/order-detail.component';
import {ConfirmComponent} from './users/confirm/confirm.component';
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    OrdersComponent,
    ProductsComponent,
    UsersComponent,
    AdminComponent,
    ProductDetailComponent,
    OrderDetailComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule
  ]
})
export class AdminModule {
}
