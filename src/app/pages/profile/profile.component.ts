import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../auth/DTO/user.dto';
import { ProfileGroupsComponent } from './profile-groups/profile-groups.component';
import { Group } from '../../models/group.model';
import { TimelinePost } from '../../models/post.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
	selectPinnedPost,
	selectProfileGroups,
	selectProfilePictureUrl,
	selectProfilePosts,
	selectProfileUser,
} from '../../store/profile/profile.selectors';
import {
	loadProfile,
	loadProfileGroups,
	loadProfilePosts,
	setProfilePictureUrl,
} from '../../store/profile/profile.actions';
import { AsyncPipe, NgIf } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { environment } from '../../../environments/environment';
import { PinnedPostComponent } from './post-list/pinned-post/pinned-post.component';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [
		ProfileGroupsComponent,
		AsyncPipe,
		PostListComponent,
		PinnedPostComponent,
		NgIf,
	],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
	protected readonly environment = environment;
	loggedInUser$!: Observable<UserDTO | null>;
	userPosts$!: Observable<TimelinePost[]>;
	userGroups$!: Observable<Group[]>;
	profilePictureUrl$!: Observable<unknown>;
	pinnedPost$!: Observable<TimelinePost | null>;

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.store.dispatch(loadProfile());

		this.loggedInUser$ = this.store.select(selectProfileUser);
		this.profilePictureUrl$ = this.store.select(selectProfilePictureUrl);
		this.pinnedPost$ = this.store.select(selectPinnedPost);

		this.loggedInUser$.subscribe(user => {
			if (user) {
				if (user.profilePicture) {
					const profilePictureUrl = `${environment.backendUrl}/files/${user.profilePicture.id}`;
					this.store.dispatch(setProfilePictureUrl({ profilePictureUrl }));
				}
				this.store.dispatch(loadProfilePosts({ userId: user.id }));
				this.store.dispatch(loadProfileGroups());
			}
		});

		this.userPosts$ = this.store.select(selectProfilePosts);
		this.userGroups$ = this.store.select(selectProfileGroups);
	}
}
