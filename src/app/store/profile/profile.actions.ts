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

export const loadProfilePosts = createAction('[Profile] Load Profile Posts');

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
