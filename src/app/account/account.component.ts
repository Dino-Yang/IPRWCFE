import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/_services/auth.service";
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {UserDetailsService} from "../shared/_services/user-details.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [fadeInUpOnEnterAnimation({anchor: 'enter'})]
})
export class AccountComponent implements OnInit {
  scene: string = 'account';
  hasUserDetails: boolean = false;

  constructor(private authService: AuthService, private userDetailsService: UserDetailsService, private router: Router) {

  }

  ngOnInit(): void {
    this.userDetailsService.getUserDetailsExist(this.authService.getLoggedInUserId()).subscribe({
      next: response => {
        if (response == undefined) {
          this.router.navigate(['/userDetails'])
        }
        this.hasUserDetails = response.payload;
      }
    })
  }


  logOut() {
    this.authService.logout();
  }

  swapScene(scene: string) {
    this.scene = scene;
  }
}
