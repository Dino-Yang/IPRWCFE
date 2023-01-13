import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserDetailsService} from "../../shared/_services/user-details.service";
import {UserService} from "../../shared/_services/user.service";
import {Router} from "@angular/router";
import {ToastService} from "../../shared/_services/toast.service";
import {AuthService} from "../../shared/_services/auth.service";
import {UserDetails} from "../../shared/_model/user-details";
import {countries} from 'src/app/shared/store/countries';
import {fadeInUpOnEnterAnimation} from "angular-animations";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  animations: [fadeInUpOnEnterAnimation({anchor: 'enter'})]
})
export class AccountDetailsComponent {
  public countries: any = countries
  hide = true;
  userDetails: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    zipcode: new FormControl(''),
    country: new FormControl(''),
  });
  loggedInUserDetails: any = {};


  constructor(private formBuilder: FormBuilder, private userDetailsService: UserDetailsService, private userService: UserService, private router: Router, private toastService: ToastService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userDetailsService.getUserDetailsByUserId(this.authService.getLoggedInUserId()).subscribe(value => {
      this.loggedInUserDetails = value.payload;
      this.userDetails = this.formBuilder.group(
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
          ]
        },
      )
    })
  }


  get f(): { [key: string]: AbstractControl } {
    return this.userDetails.controls;
  }

  onSubmit(): void {
    if (this.userDetails.invalid) {
      return;
    }
    let userId = this.authService.getLoggedInUserId();
    this.userDetailsService.saveUserDetails(new UserDetails(userId, this.userDetails.value.firstName, this.userDetails.value.lastName, this.userDetails.value.address, this.userDetails.value.zipcode, this.userDetails.value.country)).subscribe({
      next: () => {
        this.router.navigate(['/account']);
      }
    })
  }

}
