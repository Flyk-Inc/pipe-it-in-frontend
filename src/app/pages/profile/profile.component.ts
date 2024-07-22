import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
	updateProfile,
	uploadProfilePicture,
} from '../../store/profile/profile.actions';
import { AsyncPipe, NgIf } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { environment } from '../../../environments/environment';
import { PinnedPostComponent } from './post-list/pinned-post/pinned-post.component';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../component/typography/icon/icon.component';
import { SidenavComponent } from '../../component/nav/sidenav/sidenav.component';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [
		ProfileGroupsComponent,
		AsyncPipe,
		PostListComponent,
		PinnedPostComponent,
		NgIf,
		FormsModule,
		IconComponent,
		SidenavComponent,
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
	showEditProfile = false;
	profileData: Partial<UserDTO> = {};

	@ViewChild('profilePictureInput') profilePictureInput!: ElementRef;

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
				this.profileData = { ...user };
				this.store.dispatch(loadProfilePosts({ userId: user.id }));
			}
		});
		this.store.dispatch(loadProfileGroups());
		this.userPosts$ = this.store.select(selectProfilePosts);
		this.userGroups$ = this.store.select(selectProfileGroups);
	}

	onUpdateProfile() {
		this.store.dispatch(updateProfile({ profileData: this.profileData }));
		this.showEditProfile = false;
	}

	onFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			const file = input.files[0];
			this.store.dispatch(uploadProfilePicture({ file }));
		}
	}

	triggerFileInput() {
		this.profilePictureInput.nativeElement.click();
	}
}
