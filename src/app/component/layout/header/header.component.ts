import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../auth/authentication.service';
import { UserDTO } from '../../../auth/DTO/user.dto';
import { IconComponent } from '../../typography/icon/icon.component';
import { ThemeService } from '../../../service/theme.service';
import { Observable, Subscription } from 'rxjs';
import { UnderlineComponent } from '../underline/underline.component';
import { Store } from '@ngrx/store';
import { selectProfilePictureUrl } from '../../../store/profile/profile.selectors';
import { setProfilePictureUrl } from '../../../store/profile/profile.actions';
import { environment } from '../../../../environments/environment';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [
		AsyncPipe,
		RouterLink,
		NgOptimizedImage,
		IconComponent,
		UnderlineComponent,
		ReactiveFormsModule,
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
	profilePictureUrl$!: Observable<string | null>;
	searchField = new FormControl('', { nonNullable: true });

	constructor(
		protected authenticationService: AuthenticationService,
		private themeService: ThemeService,
		private router: Router,
		private store: Store
	) {}

	ngOnInit() {
		this.loggedInUserSubscription$.subscribe(user => {
			this.loggedInUser = user;
			if (user?.profilePicture) {
				const profilePictureUrl = `${environment.backendUrl}/files/${user.profilePicture.id}`;
				this.store.dispatch(setProfilePictureUrl({ profilePictureUrl }));
			}
		});
		this.tokenSubscription$.subscribe(token => {
			this.token = token;
		});
		this.themeSubscription = this.themeService
			.isDarkMode()
			.subscribe(darkMode => {
				this.isDarkMode = darkMode;
			});
		this.profilePictureUrl$ = this.store.select(selectProfilePictureUrl);
	}

	logout() {
		this.authenticationService.logout();
	}

	navigateToProfile() {
		this.router.navigate(['/profile']);
	}

	ngOnDestroy() {
		this.loggedInUserSubscription$.unsubscribe();
		this.tokenSubscription$.unsubscribe();
		if (this.themeSubscription) {
			this.themeSubscription.unsubscribe();
		}
	}

	searchResources() {
		if (!this.searchField.value) {
			return;
		}
		this.router
			.navigate(['/search'], { queryParams: { page: this.searchField.value } })
			.then(success => {
				if (!success) {
					console.error('Navigation has failed!');
				}
			})
			.catch(err => {
				console.error('Navigation error:', err);
			});
	}
}
