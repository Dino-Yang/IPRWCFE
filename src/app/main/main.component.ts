import {Component, OnInit} from '@angular/core';
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {ProductService} from "../shared/_services/product.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [fadeInUpOnEnterAnimation({anchor: 'enter', duration: 2000}), fadeInUpOnEnterAnimation({
    anchor: 'slowEnter',
    delay: 900,
  })]
})
export class MainComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
