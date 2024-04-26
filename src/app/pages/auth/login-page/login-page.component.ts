import {Component} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../auth/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  signInForm = new FormBuilder().nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  signInWithGoogle() {
    this.authenticationService.signInWithGooglePopup(
    ).subscribe({
      next: () => {
        this.redirectOnSucessfulSignUp()
      },
      error: (error) => {
        console.error('error', error)
      }
    })
  }

  redirectOnSucessfulSignUp() {
    this.router.navigate(['/']).then()
  }

  signInWithEmail() {
    this.authenticationService.logInWithEmailAndPassword(
      this.signInForm.controls.email.value,
      this.signInForm.controls.password.value
    ).subscribe({
        next: () => {
          this.redirectOnSucessfulSignUp()
        },
        error: (error) => {
          console.error('error', error)
        }
      }
    )
  }
}
