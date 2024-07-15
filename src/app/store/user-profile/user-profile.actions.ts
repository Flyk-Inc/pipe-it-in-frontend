import { createAction, props } from '@ngrx/store';
import { UserDTO } from '../../auth/DTO/user.dto';
import { TimelinePost } from '../../models/post.model';
import { Group } from '../../models/group.model';

export const loadUserProfile = createAction(
	'[User Profile] Load User Profile',
	props<{ userId: number }>()
);

export const loadUserProfileSuccess = createAction(
	'[User Profile] Load User Profile Success',
	props<{ user: UserDTO }>()
);

export const loadUserProfileFailure = createAction(
	'[User Profile] Load User Profile Failure',
	props<{ error: string }>()
);

export const loadUserProfileGroups = createAction(
	'[User Profile] Load User Profile Groups',
	props<{ userId: number }>()
);

export const loadUserProfileGroupsSuccess = createAction(
	'[User Profile] Load User Profile Groups Success',
	props<{ groups: Group[] }>()
);

export const loadUserProfileGroupsFailure = createAction(
	'[User Profile] Load User Profile Groups Failure',
	props<{ error: string }>()
);

export const loadUserProfilePosts = createAction(
	'[User Profile] Load User Profile Posts',
	props<{ userId: number }>()
);

export const loadUserProfilePostsSuccess = createAction(
	'[User Profile] Load User Profile Posts Success',
	props<{ posts: TimelinePost[] }>()
);

export const loadUserProfilePostsFailure = createAction(
	'[User Profile] Load User Profile Posts Failure',
	props<{ error: string }>()
);

export const followUser = createAction(
	'[User Profile] Follow User',
	props<{ userId: number; currentUser: UserDTO }>()
);

export const followUserSuccess = createAction(
	'[User Profile] Follow User Success',
	props<{ userId: number; currentUser: UserDTO }>()
);

export const followUserFailure = createAction(
	'[User Profile] Follow User Failure',
	props<{ error: string }>()
);

export const unfollowUser = createAction(
	'[User Profile] Unfollow User',
	props<{ userId: number; currentUser: UserDTO }>()
);

export const unfollowUserSuccess = createAction(
	'[User Profile] Unfollow User Success',
	props<{ userId: number; currentUser: UserDTO }>()
);

export const unfollowUserFailure = createAction(
	'[User Profile] Unfollow User Failure',
	props<{ error: string }>()
);

export const setUserProfilePictureUrl = createAction(
	'[User Profile] Set Profile Picture Url',
	props<{ profilePictureUrl: string }>()
);

export const getPinnedPost = createAction(
	'[User Profile] Get Pinned Post',
	props<{ postId: number }>()
);

export const getPinnedPostSuccess = createAction(
	'[User Profile] Get Pinned Post Success',
	props<{ post: TimelinePost }>()
);

export const getPinnedPostFailure = createAction(
	'[User Profile] Get Pinned Post Failure',
	props<{ error: string }>()
);
