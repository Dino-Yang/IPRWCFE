import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoryComponent} from './history/history.component';
import {AccountDetailsComponent} from './account-details/account-details.component';
import {DetailsComponent} from './details/details.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatSelectModule} from "@angular/material/select";
import { HistoryItemComponent } from './history/history-item/history-item.component';


@NgModule({
  declarations: [
    HistoryComponent,
    AccountDetailsComponent,
    DetailsComponent,
    HistoryItemComponent
  ],
  exports: [
    AccountDetailsComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class AccountModule {
}
