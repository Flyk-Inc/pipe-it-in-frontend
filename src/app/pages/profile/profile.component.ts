import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../auth/DTO/user.dto';
import { ProfileGroupsComponent } from './profile-groups/profile-groups.component';
import { Group } from '../../models/group.model';
import { TimelinePost } from '../../models/post.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
	selectProfileGroups,
	selectProfilePictureUrl,
	selectProfilePosts,
	selectProfileUser,
} from '../../store/profile/profile.selectors';
import {
	loadProfile,
	loadProfileGroups,
	loadProfilePosts,
} from '../../store/profile/profile.actions';
import { AsyncPipe } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [ProfileGroupsComponent, AsyncPipe, PostListComponent],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
	loggedInUser$!: Observable<UserDTO | null>;
	userPosts$!: Observable<TimelinePost[]>;
	userGroups$!: Observable<Group[]>;
	profilePictureUrl$!: Observable<string>;

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.store.dispatch(loadProfile());

		this.loggedInUser$ = this.store.select(selectProfileUser);

		this.loggedInUser$.subscribe(user => {
			if (user) {
				console.log(user.profilePicture);
				this.profilePictureUrl$ = this.store.select(selectProfilePictureUrl);
				this.store.dispatch(loadProfilePosts({ userId: user.id }));
				this.store.dispatch(loadProfileGroups());
			}
		});

		this.userPosts$ = this.store.select(selectProfilePosts);
		this.userGroups$ = this.store.select(selectProfileGroups);
	}
}
