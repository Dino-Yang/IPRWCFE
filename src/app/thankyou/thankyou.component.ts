import {Component} from '@angular/core';
import {fadeInUpOnEnterAnimation} from "angular-animations";

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss'],
  animations: [fadeInUpOnEnterAnimation({anchor: 'enter', duration: 2000}), fadeInUpOnEnterAnimation({
    anchor: 'slowEnter',
    delay: 900, duration: 2000
  })]
})
export class ThankyouComponent {

}
