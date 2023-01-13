import {Component} from '@angular/core';
import {NgbActiveOffcanvas, NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../shared/_services/auth.service";
import {Router} from "@angular/router";
import {CartComponent} from "../../cart/cart.component";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  isAdmin: any;


  constructor(public activeOffcanvas: NgbActiveOffcanvas, private offcanvasService: NgbOffcanvas, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.authService.getLoggedIn.subscribe(() => {
      this.isAdmin = this.authService.isAdmin();
    })
  }

  goToAccount() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/account']);
    } else {
      this.router.navigate(['/login']);
    }
    this.activeOffcanvas.dismiss();
  }

  open() {
    this.activeOffcanvas.dismiss();
    this.offcanvasService.open(CartComponent, {position: 'end'});
  }
}
