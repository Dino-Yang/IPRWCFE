import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbToastModule} from "@ng-bootstrap/ng-bootstrap";
import {FilterPipe} from './_pipe/filter.pipe';


@NgModule({
  declarations: [
    FilterPipe
  ],
  imports: [
    CommonModule,
    NgbToastModule,
  ],
  exports: [
    FilterPipe
  ]
})

export class SharedModule {
}
