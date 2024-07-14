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
  setUserProfilePictureUrl,
  unfollowUser,
} from '../../store/user-profile/user-profile.actions';
import { AsyncPipe, NgIf } from '@angular/common';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IconComponent } from '../../component/typography/icon/icon.component';
import { PostListComponent } from '../profile/post-list/post-list.component';
import { PinnedPostComponent } from '../profile/post-list/pinned-post/pinned-post.component';
import { ProfileGroupsComponent } from '../profile/profile-groups/profile-groups.component';
import { AuthenticationService } from '../../auth/authentication.service';
import { selectProfileUser } from '../../store/profile/profile.selectors';

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
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  protected readonly environment = environment;
  user$!: Observable<UserDTO | null>;
  loggedInUser$!: Observable<UserDTO | null>;
  userPosts$!: Observable<TimelinePost[]>;
  userGroups$!: Observable<Group[]>;
  profilePictureUrl$!: Observable<unknown>;
  pinnedPost$!: Observable<TimelinePost | null>;
  isFollowing$!: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    console.log("coucou")

    const userId = Number(this.route.snapshot.paramMap.get('userId'));
    if (userId) {
      this.store.dispatch(loadUserProfile({ userId }));

      this.user$ = this.store.select(selectUserProfile);
      this.profilePictureUrl$ = this.store.select(selectUserProfilePictureUrl);

      this.user$.subscribe(user => {
        if (user && user.profilePicture) {
          const profilePictureUrl = `${environment.backendUrl}/files/${user.profilePicture.id}`;
          this.store.dispatch(setUserProfilePictureUrl({ profilePictureUrl }));
        }
      });

      this.store.dispatch(loadUserProfilePosts({ userId }));
      this.store.dispatch(loadUserProfileGroups({ userId }));
      this.userPosts$ = this.store.select(selectUserProfilePosts);
      this.userGroups$ = this.store.select(selectUserProfileGroups);
      this.pinnedPost$ = this.store.select(selectPinnedPost);

      this.loggedInUser$ = this.store.select(selectProfileUser);
      this.loggedInUser$.subscribe(user => {
        if (user) {
          this.isFollowing$ = this.store.select(selectIsFollowing, { currentUserId: user.id });
        }
      });
    }
  }

  followUser(userId?: number) {
    if (userId !== undefined) {
      this.loggedInUser$.subscribe(currentUser => {
        if (currentUser) {
          this.store.dispatch(followUser({ userId, currentUser }));
        }
      }).unsubscribe(); // Unsubscribe to avoid memory leaks
    }
  }

  unfollowUser(userId?: number) {
    if (userId !== undefined) {
      this.loggedInUser$.subscribe(currentUser => {
        if (currentUser) {
          this.store.dispatch(unfollowUser({ userId, currentUser }));
        }
      }).unsubscribe();
    }
  }
}
