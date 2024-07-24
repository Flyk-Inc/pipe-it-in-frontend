import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../auth/DTO/user.dto';
import { Group } from '../../models/group.model';
import { TimelinePost } from '../../models/post.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
	selectIsFollowing,
	selectPinnedPost,
	selectUserProfile,
	selectUserProfileGroups,
	selectUserProfilePictureUrl,
	selectUserProfilePosts,
} from '../../store/user-profile/user-profile.selectors';
import {
	followUser,
	loadUserProfile,
	loadUserProfileGroups,
	loadUserProfilePosts,
	sendFollowRequest,
	setUserProfilePictureUrl,
	unfollowUser,
} from '../../store/user-profile/user-profile.actions';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IconComponent } from '../../component/typography/icon/icon.component';
import { PostListComponent } from '../profile/post-list/post-list.component';
import { PinnedPostComponent } from '../profile/post-list/pinned-post/pinned-post.component';
import { ProfileGroupsComponent } from '../profile/profile-groups/profile-groups.component';
import { AuthenticationService } from '../../auth/authentication.service';
import { SidenavComponent } from '../../component/nav/sidenav/sidenav.component';

@Component({
	selector: 'app-user-profile',
	standalone: true,
	imports: [
		ProfileGroupsComponent,
		AsyncPipe,
		PostListComponent,
		PinnedPostComponent,
		NgIf,
		FormsModule,
		IconComponent,
		NgClass,
		SidenavComponent,
	],
	templateUrl: './user-profile.component.html',
	styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
	protected readonly environment = environment;
	consultedUser$!: Observable<UserDTO | null>;
	consultedUser: UserDTO | null = null;
	loggedInUserSubscription$ = this.authenticationService.currentUserSource;
	loggedInUser: UserDTO | null = null;
	userPosts$!: Observable<TimelinePost[]>;
	userGroups$!: Observable<Group[]>;
	profilePictureUrl$!: Observable<unknown>;
	pinnedPost$!: Observable<TimelinePost | null>;
	isFollowing$!: Observable<boolean>;
	followRequestSent = false;
	followRequestSentText = $localize`:@@follow-request.sent:Follow request sent`;
	followText = $localize`:@@follow:Follow`;

	constructor(
		private store: Store,
		protected authenticationService: AuthenticationService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		const userId = Number(this.route.snapshot.paramMap.get('userId'));

		this.loggedInUserSubscription$.subscribe(user => {
			this.loggedInUser = user;
			if (user && user.id === userId) {
				this.router.navigate(['/profile']);
			}
		});

		if (userId) {
			this.store.dispatch(loadUserProfile({ userId }));

			this.consultedUser$ = this.store.select(selectUserProfile);
			this.profilePictureUrl$ = this.store.select(selectUserProfilePictureUrl);

			this.consultedUser$.subscribe(user => {
				if (user) {
					this.consultedUser = user;
					if (user.profilePicture) {
						const profilePictureUrl = `${environment.backendUrl}/files/${user.profilePicture.id}`;
						this.store.dispatch(
							setUserProfilePictureUrl({ profilePictureUrl })
						);
					}
					this.checkFollowRequestStatus(user);
				}
				this.store.dispatch(loadUserProfilePosts({ userId }));
			});

			this.store.dispatch(loadUserProfileGroups({ userId }));
			this.userPosts$ = this.store.select(selectUserProfilePosts);
			this.userGroups$ = this.store.select(selectUserProfileGroups);
			this.pinnedPost$ = this.store.select(selectPinnedPost);

			this.loggedInUserSubscription$.subscribe(user => {
				this.loggedInUser = user;
				if (user) {
					this.isFollowing$ = this.store.select(selectIsFollowing(user.id));
				}
			});
		}
	}

	checkFollowRequestStatus(user: UserDTO) {
		const currentUserId = this.loggedInUser?.id;
		if (currentUserId && user.receivedFollowRequests) {
			this.followRequestSent = user.receivedFollowRequests.some(
				request => request.follower.id === currentUserId && !request.isAccepted
			);
		}
	}

	followUser() {
		const userId = this.consultedUser?.id;
		const currentUser = this.loggedInUser;
		if (this.consultedUser?.isPrivate && userId && currentUser) {
			this.store.dispatch(sendFollowRequest({ userId, currentUser }));
			this.followRequestSent = true;
		} else if (userId && currentUser) {
			this.store.dispatch(followUser({ userId, currentUser }));
		}
	}

	unfollowUser() {
		const userId = this.consultedUser?.id;
		const currentUser = this.loggedInUser;
		if (userId && currentUser) {
			this.store.dispatch(unfollowUser({ userId, currentUser }));
		}
	}
}
