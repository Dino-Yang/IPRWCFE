import {Component, Input} from '@angular/core';
import {User} from "../../../shared/_model/user";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  @Input() user: any;

  constructor(public modal: NgbActiveModal) {
  }
}
