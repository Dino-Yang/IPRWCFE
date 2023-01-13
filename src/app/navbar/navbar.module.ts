import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from "./navbar.component";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {AppRoutingModule} from "../app-routing.module";
import { SidenavComponent } from './sidenav/sidenav.component';


@NgModule({
  declarations: [
    NavbarComponent,
    SidenavComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatIconModule,
    MatBadgeModule,
  ]
})
export class NavbarModule {
}
