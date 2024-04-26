import {Component} from '@angular/core';
import {AuthenticationService} from "../../../auth/authentication.service";
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent  {
  signUpForm = new FormBuilder().nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
  });
  providerSignUpForm = new FormBuilder().nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
  });
  protected errorMessage: string = '';
  protected providerErrorMessage: string = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  signUpWithGoogle() {
    this.authenticationService.signUpWithProviderPopup(
      this.providerSignUpForm.controls.firstName.value,
      this.providerSignUpForm.controls.lastName.value,
      "Goolge"
    ).subscribe({
      next: (user) => {
        console.log('google user', user)
        this.redirectOnSucessfulSignUp()
      },
      error: (error) => {
        this.checkProviderSignUpError()
        console.error('error', error)
      }
    })
  }

  signUpWithGithub() {
    this.authenticationService.signUpWithProviderPopup(
      this.providerSignUpForm.controls.firstName.value,
      this.providerSignUpForm.controls.lastName.value,
      "Github"
    ).subscribe({
      next: (user) => {
        console.log('github user', user)
        this.redirectOnSucessfulSignUp()
      },
      error: (error) => {
        this.checkProviderSignUpError()
        console.error('error', error)
      }
    })
  }

  confirmSignUpWithEmailForm() {
    this.signUpForm.controls.email.setValidators([Validators.required, Validators.email])
    this.signUpForm.controls.password.setValidators([Validators.required])
    this.signUpForm.controls.confirmPassword.setValidators([Validators.required])
    this.signUpForm.updateValueAndValidity()
    if (this.signUpForm.valid) {
      const email = this.signUpForm.controls['email'].value
      const password = this.signUpForm.controls.password.value
      this.signUpWithEmail(email, password)
    }
  }

  signUpWithEmail(email: string, password: string) {
    const userToCreate = {
      email,
      firstName: this.signUpForm.controls.firstName.value,
      lastName: this.signUpForm.controls.lastName.value,
    }
    this.authenticationService.signUpWithEmail(email, password, userToCreate).subscribe({
      next: (user) => {
        console.log('user', user)
        this.redirectOnSucessfulSignUp()
      },
      error: (error) => {
        this.checkSignUpError()
        console.error('error', error)
      }
    })
  }

  redirectOnSucessfulSignUp() {
    this.router.navigate(['/']).then()
  }

  checkSignUpError() {
    this.errorMessage = 'Adresse email déjà utilisée'
  }

  checkProviderSignUpError() {
    this.providerErrorMessage = 'Adresse email déjà utilisée'
  }
}
