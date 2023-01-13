import {Component} from '@angular/core';
import {CartService} from "../shared/_services/cart.service";
import {AuthService} from "../shared/_services/auth.service";
import {Router} from "@angular/router";
import {UserDetailsService} from "../shared/_services/user-details.service";
import {CartItemService} from "../shared/_services/cart-item.service";
import {CartItem} from "../shared/_model/cart-item";
import {OrdersService} from "../shared/_services/orders.service";
import {Orders} from "../shared/_model/orders";
import {AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {countries} from '../shared/store/countries';
import {ShippingDetails} from "../shared/_model/shipping-details";
import {ShippingDetailsService} from "../shared/_services/shipping-details.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  items = this.cartService.getItems();
  shippingForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    zipcode: new FormControl(''),
    country: new FormControl(''),
  });
  cartId: number = -1;
  totalPrice: number = 0;
  method: string = '';
  options: string[] = ['IDEAL', 'VISA', 'OMINBOMIN CREDITS'];
  loggedInUserDetails: any = {};
  public countries: any = countries;
  hasUserDetails: any;


  constructor(private shippingDetailsService: ShippingDetailsService, private userDetailsService: UserDetailsService, private formBuilder: FormBuilder, private cartService: CartService, private cartItemService: CartItemService, private orderService: OrdersService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {

    if (this.cartService.getItems().length === 0) {
      this.router.navigate(['/collections'])
    }
    this.userDetailsService.getUserDetailsExist(this.authService.getLoggedInUserId()).subscribe({
      next: response => {
        this.hasUserDetails = response.payload;
        if (!this.hasUserDetails) {
          this.router.navigate(['/userDetails'])
        }
      }
    })
    this.refresh();
    this.totalPrice = this.cartService.getCartPrice();
    this.userDetailsService.getUserDetailsByUserId(this.authService.getLoggedInUserId()).subscribe(value => {
      this.loggedInUserDetails = value.payload;
      this.shippingForm = this.formBuilder.group(
        {
          firstName: [
            this.loggedInUserDetails.firstName,
            [
              Validators.required
            ]
          ],
          lastName: [
            this.loggedInUserDetails.lastName,
            [
              Validators.required
            ]
          ],
          address: [
            this.loggedInUserDetails.address,
            [
              Validators.required,
              Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])/)
            ]
          ],
          zipcode: [
            this.loggedInUserDetails.zipcode,
            [
              Validators.required,
              Validators.pattern(/^(?=\D*\d)(?=[^A-Z]*[A-Z])/)
            ]
          ],
          country: [
            this.loggedInUserDetails.country,
            [Validators.required]
          ],
        },
      )
    })
  }

  refresh() {
    this.items = this.cartService.getItems();
  }

  createCartItems() {
    for (let item of this.items) {
      let cartItem = CartItem.createCartItemWithoutId(1, item.price, this.cartId, item.id);
      this.totalPrice += item.price;
      this.cartItemService.saveCartItem(cartItem, this.cartId).subscribe();
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.shippingForm.controls;
  }

  buy() {
    let value = this.shippingForm.value;
    if (this.items.length !== 0) {
      this.cartService.createEmptyCart()
        .subscribe({
          next: id => {
            this.cartId = id.payload;
            this.createCartItems();
            let order = Orders.createOrderWithoutId(this.authService.getLoggedInUserId(), Date.now(), this.cartId, this.method);
            this.orderService.postOrder(order)
              .subscribe({
                next: response => {
                  let shippingDetails = new ShippingDetails(response.payload, value.firstName, value.lastName, value.address, value.zipcode, value.country)
                  this.shippingDetailsService.saveShippingDetails(shippingDetails).subscribe();
                  this.totalPrice = this.cartService.getCartPrice();
                  this.cartService.updatePrice(this.totalPrice, this.cartId).subscribe();
                  this.cartService.clearCart();
                  this.router.navigate(['/thankyou']);
                }
              });
          }
        });
    }
  }
}
