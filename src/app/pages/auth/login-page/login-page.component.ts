import {Component} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../auth/authentication.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../notification.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ButtonComponent} from "../../../component/layout/button/button.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  signInForm = new FormBuilder().nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService) {
  }

  signInWithGoogle() {
    this.authenticationService.signInWithGooglePopup(
    ).subscribe({
      next: () => {
        this.redirectOnSucessfulSignIn()
      },
      error: (error) => {
        console.error('error', error)
      }
    })
  }

  signInWithEmail() {
    this.authenticationService.logInWithEmailAndPassword(
      this.signInForm.controls.email.value,
      this.signInForm.controls.password.value
    ).subscribe({
        next: () => {
          this.redirectOnSucessfulSignIn()
        },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showErrorToast(error.error.message)
          console.error('error', error)
        }
      }
    )
  }

  private redirectOnSucessfulSignIn() {
    this.router.navigate(['/']).then()
  }
}
