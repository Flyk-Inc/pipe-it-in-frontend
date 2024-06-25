import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserDTO } from '../../auth/DTO/user.dto';
import { AuthenticationService } from '../../auth/authentication.service';
import { ProfileGroupsComponent } from './profile-groups/profile-groups.component';
import { Group } from '../../models/group.model';
import { SocialService } from '../../service/social.service';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [ProfileGroupsComponent],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
	loggedInUserSubscription$ = this.authenticationService.currentUserSource;
	loggedInUser: UserDTO | null = null;
	userGroups: Group[] = [];

	constructor(
		protected authenticationService: AuthenticationService,
		protected socialService: SocialService
	) {}

	ngOnInit(): void {
		this.loggedInUserSubscription$.subscribe(user => {
			this.loggedInUser = user;
		});
		this.loadUserGroups();
	}

	ngOnDestroy() {
		this.loggedInUserSubscription$.unsubscribe();
	}

	loadUserGroups(): void {
		this.socialService.getUserGroups().subscribe(groups => {
			this.userGroups = groups;
		});
	}
}
