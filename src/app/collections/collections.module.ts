import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CollectionsComponent} from "./collections.component";
import {RouterModule} from "@angular/router";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CollectionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatChipsModule
  ]
})
export class CollectionsModule {
}
