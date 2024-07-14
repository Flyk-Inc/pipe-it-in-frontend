import { createAction, props } from '@ngrx/store';
import { UserDTO } from '../../auth/DTO/user.dto';
import { TimelinePost } from '../../models/post.model';
import { Group } from '../../models/group.model';

export const loadProfile = createAction('[Profile] Load Profile');

export const loadProfileSuccess = createAction(
	'[Profile] Load Profile Success',
	props<{ user: UserDTO }>()
);

export const loadProfileFailure = createAction(
	'[Profile] Load Profile Failure',
	props<{ error: string }>()
);

export const loadProfilePosts = createAction(
	'[Profile] Load Profile Posts',
	props<{ userId: number }>()
);

export const loadProfilePostsSuccess = createAction(
	'[Profile] Load Profile Posts Success',
	props<{ posts: TimelinePost[] }>()
);

export const loadProfilePostsFailure = createAction(
	'[Profile] Load Profile Posts Failure',
	props<{ error: string }>()
);

export const loadProfileGroups = createAction('[Profile] Load Profile Groups');

export const loadProfileGroupsSuccess = createAction(
	'[Profile] Load Profile Groups Success',
	props<{ groups: Group[] }>()
);

export const loadProfileGroupsFailure = createAction(
	'[Profile] Load Profile Groups Failure',
	props<{ error: string }>()
);

export const setProfilePictureUrl = createAction(
	'[Profile] Set Profile Picture URL',
	props<{ profilePictureUrl: string }>()
);

export const pinPost = createAction(
	'[Profile] Pin Post',
	props<{ postId: number }>()
);

export const unpinPost = createAction('[Profile] Unpin Post');

export const deletePost = createAction(
	'[Profile] Delete Post',
	props<{ postId: number }>()
);

export const pinPostSuccess = createAction(
	'[Profile] Pin Post Success',
	props<{ postId: number }>()
);

export const unpinPostSuccess = createAction('[Profile] Unpin Post Success');

export const deletePostSuccess = createAction(
	'[Profile] Delete Post Success',
	props<{ postId: number }>()
);

export const updateProfile = createAction(
	'[Profile] Update Profile',
	props<{ profileData: Partial<UserDTO> }>()
);

export const updateProfileSuccess = createAction(
	'[Profile] Update Profile Success',
	props<{ user: UserDTO }>()
);

export const updateProfileFailure = createAction(
	'[Profile] Update Profile Failure',
	props<{ error: string }>()
);

export const uploadProfilePicture = createAction(
	'[Profile] Upload Profile Picture',
	props<{ file: File }>()
);

export const uploadProfilePictureSuccess = createAction(
	'[Profile] Upload Profile Picture Success',
	props<{ updatedUser: UserDTO }>()
);

export const uploadProfilePictureFailure = createAction(
	'[Profile] Upload Profile Picture Failure',
	props<{ error: string }>()
);
