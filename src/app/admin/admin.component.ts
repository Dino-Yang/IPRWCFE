import {Component, HostListener} from '@angular/core';
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {AuthService} from "../shared/_services/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [fadeInUpOnEnterAnimation({anchor: 'enter'})]
})
export class AdminComponent {
  scene: string = 'products';
  isDesktop: boolean = false;
  screenLGSize: number = 992;

  constructor(private authService: AuthService) {

  }

  @HostListener("window:resize", []) updateIsDesktop() {
    this.isDesktop = window.innerWidth >= this.screenLGSize;
  }


  ngOnInit() {
    this.updateIsDesktop();
  }

  logOut() {
    this.authService.logout();
  }

  swapScene(scene: string) {
    this.scene = scene;
  }
}
