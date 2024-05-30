import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../auth/authentication.service';
import { UserDTO } from '../../../auth/DTO/user.dto';
import { IconComponent } from '../../typography/icon/icon.component';
import { ThemeService } from '../../../theme.service';
import { Subscription } from 'rxjs';
import { UnderlineComponent } from '../underline/underline.component';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [
		AsyncPipe,
		RouterLink,
		NgOptimizedImage,
		IconComponent,
		UnderlineComponent,
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
	loggedInUserSubscription$ = this.authenticationService.currentUserSource;
	loggedInUser: UserDTO | null = null;
	tokenSubscription$ = this.authenticationService.tokenSource;
	token: string | null = null;
	isDarkMode: boolean = false;
	private themeSubscription!: Subscription;

	constructor(
		protected authenticationService: AuthenticationService,
		private themeService: ThemeService
	) {}

	ngOnInit() {
		this.loggedInUserSubscription$.subscribe(user => {
			this.loggedInUser = user;
		});
		this.tokenSubscription$.subscribe(token => {
			this.token = token;
		});
		this.themeSubscription = this.themeService
			.isDarkMode()
			.subscribe(darkMode => {
				this.isDarkMode = darkMode;
			});
	}

	logout() {
		this.authenticationService.logout();
	}

	ngOnDestroy() {
		this.loggedInUserSubscription$.unsubscribe();
		this.tokenSubscription$.unsubscribe();
		if (this.themeSubscription) {
			this.themeSubscription.unsubscribe();
		}
	}
}
