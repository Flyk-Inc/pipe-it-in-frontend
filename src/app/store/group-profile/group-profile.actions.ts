import { createAction, props } from '@ngrx/store';
import { Group, GroupRequest } from '../../models/group.model';
import { CreatePostDto, TimelinePost } from '../../models/post.model';

// Load Group
export const loadGroup = createAction(
	'[Group] Load Group',
	props<{ groupId: number }>()
);

export const loadGroupSuccess = createAction(
	'[Group] Load Group Success',
	props<{ group: Group }>()
);

export const loadGroupFailure = createAction(
	'[Group] Load Group Failure',
	props<{ error: string }>()
);

// Join Group
export const joinGroup = createAction(
	'[Group] Join Group',
	props<{ groupId: number }>()
);

export const joinGroupSuccess = createAction(
	'[Group] Join Group Success',
	props<{ groupId: number }>()
);

export const joinGroupFailure = createAction(
	'[Group] Join Group Failure',
	props<{ error: string }>()
);

// Request Group Access
export const requestGroupAccess = createAction(
	'[Group] Request Group Access',
	props<{ groupId: number }>()
);

export const requestGroupAccessSuccess = createAction(
	'[Group] Request Group Access Success',
	props<{ groupId: number; request: GroupRequest }>()
);

export const requestGroupAccessFailure = createAction(
	'[Group] Request Group Access Failure',
	props<{ error: string }>()
);

// Load Group Posts
export const loadGroupPosts = createAction(
	'[Group] Load Group Posts',
	props<{ groupId: number }>()
);

export const loadGroupPostsSuccess = createAction(
	'[Group] Load Group Posts Success',
	props<{ posts: TimelinePost[] }>()
);

export const loadGroupPostsFailure = createAction(
	'[Group] Load Group Posts Failure',
	props<{ error: string }>()
);

export const createPost = createAction(
	'[Group] Create Post',
	props<{ createPostDTO: CreatePostDto; groupId: number }>()
);

export const createPostSuccess = createAction(
	'[Group] Create Post Success',
	props<{ post: TimelinePost }>()
);

export const createPostFailure = createAction(
	'[Group] Create Post Failure',
	props<{ error: string }>()
);
