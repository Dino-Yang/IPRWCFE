import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/_services/user.service";
import {Router} from "@angular/router";
import {ToastService} from "../../shared/_services/toast.service";
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {countries} from "../../shared/store/countries"
import {AuthService} from "../../shared/_services/auth.service";
import {UserDetailsService} from "../../shared/_services/user-details.service";
import {UserDetails} from "../../shared/_model/user-details";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: [fadeInUpOnEnterAnimation({anchor: 'enter'})]
})
export class DetailsComponent {
  public countries: any = countries
  hide = true;
  userDetails: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    zipcode: new FormControl(''),
    country: new FormControl(''),
  });


  constructor(private formBuilder: FormBuilder, private userDetailsService: UserDetailsService, private userService: UserService, private router: Router, private toastService: ToastService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userDetails = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
          ]
        ],
        lastName: [
          '',
          [
            Validators.required,
          ]
        ],
        address: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])/)
          ]
        ],
        zipcode: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=\D*\d)(?=[^A-Z]*[A-Z])/)
          ]
        ],
        country: [
          '',
          [Validators.required]
        ]
      },
    )
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
