import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../shared/_services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {fadeInUpOnEnterAnimation} from "angular-animations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInUpOnEnterAnimation({anchor: 'enter'})]
})
export class LoginComponent {
  hide = true;
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  failedAuth = false;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  getErrorMessage() {
    return 'You must enter a value';
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;
    this.failedAuth = false;
    this.authService.login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/account']);
        },
        error: error => {
          this.error = error;
          this.loading = false;
          this.failedAuth = true;
        }
      });
  }
}

