import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../../auth/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonComponent } from '../../../component/layout/button/button.component';

@Component({
	selector: 'app-login-page',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, ButtonComponent],
	templateUrl: './login-page.component.html',
	styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
	signInForm = new FormBuilder().nonNullable.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]],
	});
	private userNotActivatedString = $localize`:@@user.not.activated:User not activated`;
	private emailConfirmedString = $localize`:@@email.confirmed:Email confirmed`;
	loginString = $localize`:@@log.in:log in`;

	constructor(
		private authenticationService: AuthenticationService,
		private router: Router,
		private route: ActivatedRoute,
		private notificationService: NotificationService
	) {}

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			if (params['emailConfirmed'] === 'true') {
				this.notificationService.showSuccessToast(this.emailConfirmedString);
			}
		});
	}

	signInWithGoogle() {
		this.authenticationService.signInWithGooglePopup().subscribe({
			next: () => {
				this.redirectOnSucessfulSignIn();
			},
			error: error => {
				console.error('error', error);
			},
		});
	}

	signInWithEmail() {
		this.authenticationService
			.logInWithEmailAndPassword(
				this.signInForm.controls.email.value,
				this.signInForm.controls.password.value
			)
			.subscribe({
				next: () => {
					this.redirectOnSucessfulSignIn();
				},
				error: (error: HttpErrorResponse) => {
					this.checkSignUpError(error.error.message);
				},
			});
	}

	private redirectOnSucessfulSignIn() {
		this.router.navigate(['/']).then();
	}

	checkSignUpError(errorMessage: string) {
		switch (errorMessage) {
			case 'user.not.activated':
				this.notificationService.showErrorToast(this.userNotActivatedString);
				break;
			default:
				this.notificationService.showErrorToast(errorMessage);
				break;
		}
	}
}
