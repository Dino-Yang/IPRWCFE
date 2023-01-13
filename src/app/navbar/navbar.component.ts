import {Component, OnInit} from '@angular/core';
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {CartComponent} from "../cart/cart.component";
import {AuthService} from "../shared/_services/auth.service";
import {Router} from "@angular/router";
import {SidenavComponent} from "./sidenav/sidenav.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAdmin: boolean = false;

  constructor(private offcanvasService: NgbOffcanvas, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.authService.getLoggedIn.subscribe(() => {
      this.isAdmin = this.authService.isAdmin();
    })
  }

  open() {
    this.offcanvasService.open(CartComponent, {position: 'end'});
  }

  goToAccount() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/account']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  openOffCanvas() {
    this.offcanvasService.open(SidenavComponent, {position: 'end'});
  }
}
