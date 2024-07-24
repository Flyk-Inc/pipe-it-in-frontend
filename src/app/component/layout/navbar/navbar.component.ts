import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserDTO } from '../../../auth/DTO/user.dto';
import { AuthenticationService } from '../../../auth/authentication.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { IconComponent } from '../../typography/icon/icon.component';
import { Store } from '@ngrx/store';
import { fileUrl } from '../../../models/utils';
import { codeRoutePath } from '../../../pages/codes/routes';
import { pipelineRoutePath } from '../../../pages/codes/pipelines/routes';

export interface navbarItem {
	icon: string;
	label: string;
	route: string;
}

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [RouterLink, NgClass, IconComponent, RouterLinkActive, AsyncPipe],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
	profilePictureUrl$ = '';
	loggedInUserSubscription$ = this.authenticationService.currentUserSource;
	loggedInUser: UserDTO | null = null;

	constructor(
		protected authenticationService: AuthenticationService,
		private store: Store
	) {}

	navbarItems: navbarItem[] = [
		{
			route: '/home',
			label: $localize`:@@home:Home`,
			icon: 'home',
		},
		{
			route: '/' + codeRoutePath,
			label: $localize`:@@codes:Codes`,
			icon: 'code',
		},
		{
			route: `/${codeRoutePath}/${pipelineRoutePath}`,
			label: $localize`:@@pipelines:pipelines`,
			icon: 'valve',
		},
		{
			route: '/profile',
			label: $localize`:@@profile:Profile`,
			icon: 'person',
		},
	];

	ngOnInit() {
		this.loggedInUserSubscription$.subscribe(user => {
			this.loggedInUser = user;
			this.profilePictureUrl$ = fileUrl + this.loggedInUser?.profilePicture?.id;
		});
	}

	ngOnDestroy() {
		this.loggedInUserSubscription$.unsubscribe();
	}
}
