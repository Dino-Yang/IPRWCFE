import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailComponent} from "./detail.component";


@NgModule({
  declarations: [
    DetailComponent
  ],
  exports: [
    DetailComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class DetailModule {
}
