import { Component } from '@angular/core';
import { AuthenticationService } from '../../../auth/authentication.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonComponent } from '../../../component/layout/button/button.component';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { NotificationService } from '../../../service/notification.service';

@Component({
	selector: 'app-sign-up-page',
	standalone: true,
	imports: [ReactiveFormsModule, ButtonComponent, MessagesModule],
	templateUrl: './signup-page.component.html',
	styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent {
	signUpForm = new FormBuilder().nonNullable.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]],
		confirmPassword: ['', [Validators.required]],
		username: ['', [Validators.required]],
		firstName: ['', [Validators.required]],
		lastName: ['', [Validators.required]],
	});
	protected errorMessage: Message[] = [];

	registerString = $localize`:@@register:Sign Up`;
	userAlreadyExistsString = $localize`:@@user.email.already.exists:User already exists`;
	confirmationEmailSentString = $localize`:@@email.confirmation.sent:Confirmation email sent`;

	constructor(
		private authenticationService: AuthenticationService,
		private router: Router,
		private notificationService: NotificationService
	) {}

	confirmSignUpWithEmailForm() {
		this.signUpForm.controls.email.setValidators([
			Validators.required,
			Validators.email,
		]);
		this.signUpForm.controls.password.setValidators([Validators.required]);
		this.signUpForm.controls.confirmPassword.setValidators([
			Validators.required,
		]);
		this.signUpForm.updateValueAndValidity();
		if (this.signUpForm.valid) {
			const email = this.signUpForm.controls['email'].value;
			const password = this.signUpForm.controls.password.value;
			this.signUpWithEmail(email, password);
		}
	}

	signUpWithEmail(email: string, password: string) {
		const userToCreate = {
			email,
			firstName: this.signUpForm.controls.firstName.value,
			lastName: this.signUpForm.controls.lastName.value,
			username: this.signUpForm.controls.username.value,
		};
		this.authenticationService
			.signUpWithEmail(password, userToCreate)
			.subscribe({
				next: () => {
					this.redirectOnSucessfulSignUp();
				},
				error: (error: HttpErrorResponse) => {
					this.checkSignUpError(error.error.message);
				},
			});
	}

	redirectOnSucessfulSignUp() {
		this.router.navigate(['/auth/login']).then();
		this.notificationService.showInfoToast(this.confirmationEmailSentString);
	}

	checkSignUpError(errorMessage: string) {
		switch (errorMessage) {
			case 'user.email.already.exists':
				this.notificationService.showErrorToast(this.userAlreadyExistsString);
				break;
			default:
				this.notificationService.getErrorMessage(errorMessage);
				break;
		}
	}
}
