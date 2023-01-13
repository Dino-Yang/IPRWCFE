import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Validation from "./Validation";
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {UserService} from "../../shared/_services/user.service";
import {User} from "../../shared/_model/user";
import {ToastService} from "../../shared/_services/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  animations: [fadeInUpOnEnterAnimation({anchor: 'enter'})]
})
export class CreateComponent {
  hide = true;
  user: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.user = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6)
          ]
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
            Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@!%*?&])(?=[^A-Z]*[A-Z])/)
          ]
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    )
  }


  get f(): { [key: string]: AbstractControl } {
    return this.user.controls;
  }

  onSubmit(): void {
    if (this.user.get('username')?.value !== '') {
      this.userService.checkUsername(this.user.value.username).subscribe({
        next: value => {
          if (value) {
            this.user.get('username')?.setErrors({duplicate: true});
            return;
          }
        }
      })
    }
    if (this.user.get('email')?.value !== '') {
      this.userService.checkEmail(this.user.value.email).subscribe({
        next: value => {
          if (value) {
            this.user.get('email')?.setErrors({duplicate: true});
            return;
          }
        }
      })
    }
    if (this.user.invalid) {
      return;
    }
    let newUser = User.createUserWithoutId(this.user.value.username, this.user.value.email, this.user.value.password, true);
    this.userService.saveUser(newUser).subscribe({
      next: () => {
        this.router.navigate(['/account']);
      },
    })
  }

}


