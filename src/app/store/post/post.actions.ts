import { createAction, props } from '@ngrx/store';
import {
	CreateCommentDTO,
	PostComment,
	TimelinePost,
} from '../../models/post.model';

export const loadPost = createAction(
	'[Post] Load Post',
	props<{ postId: number }>()
);
export const loadPostSuccess = createAction(
	'[Post] Load Post Success',
	props<{ post: TimelinePost }>()
);
export const loadPostFailure = createAction(
	'[Post] Load Post Failure',
	props<{ error: string }>()
);

export const loadPostComments = createAction(
	'[Post] Load Post Comments',
	props<{ postId: number }>()
);
export const loadPostCommentsSuccess = createAction(
	'[Post] Load Post Comments Success',
	props<{ comments: PostComment[] }>()
);
export const loadPostCommentsFailure = createAction(
	'[Post] Load Post Comments Failure',
	props<{ error: string }>()
);

export const likePost = createAction(
	'[Post] Like Post',
	props<{ postId: number }>()
);
export const likeComment = createAction(
	'[Post] Like Comment',
	props<{ commentId: number }>()
);
export const dislikeComment = createAction(
	'[Post] Dislike Comment',
	props<{ commentId: number }>()
);

export const createComment = createAction(
	'[Post] Create Comment',
	props<{ createCommentDTO: CreateCommentDTO }>()
);
export const createCommentSuccess = createAction(
	'[Post] Create Comment Success',
	props<{ comment: PostComment }>()
);
export const createCommentFailure = createAction(
	'[Post] Create Comment Failure',
	props<{ error: string }>()
);

export const replyToComment = createAction(
	'[Comment] Reply to Comment',
	props<{ createCommentDTO: CreateCommentDTO }>()
);
