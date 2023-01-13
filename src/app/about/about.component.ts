import {Component} from '@angular/core';
import {fadeInUpOnEnterAnimation} from "angular-animations";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [fadeInUpOnEnterAnimation({anchor: 'enter', duration: 2000}), fadeInUpOnEnterAnimation({
    anchor: 'slowEnter',
    delay: 900,
    duration: 2000
  })]

})
export class AboutComponent {

}
