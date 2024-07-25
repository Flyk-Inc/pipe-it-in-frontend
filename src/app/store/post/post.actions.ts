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

export const unlikePost = createAction(
	'[Post] Unlike Post',
	props<{ postId: number }>()
);

export const likePostSuccess = createAction(
	'[Post] Like Post Success',
	props<{ postId: number }>()
);

export const unlikePostSuccess = createAction(
	'[Post] Unlike Post Success',
	props<{ postId: number }>()
);

export const postReactionFailure = createAction(
	'[Post] Post Reaction Failure',
	props<{ error: string }>()
);

export const likeComment = createAction(
	'[Comment] Like Comment',
	props<{ commentId: number }>()
);
export const dislikeComment = createAction(
	'[Comment] Dislike Comment',
	props<{ commentId: number }>()
);
export const unlikeComment = createAction(
	'[Comment] Unlike Comment',
	props<{ commentId: number }>()
);
export const undislikeComment = createAction(
	'[Comment] Undislike Comment',
	props<{ commentId: number }>()
);
export const updateCommentReaction = createAction(
	'[Comment] Update Comment Reaction',
	props<{ commentId: number; isLike: boolean }>()
);

export const likeCommentSuccess = createAction(
	'[Comment] Like Comment Success',
	props<{ commentId: number }>()
);
export const dislikeCommentSuccess = createAction(
	'[Comment] Dislike Comment Success',
	props<{ commentId: number }>()
);
export const unlikeCommentSuccess = createAction(
	'[Comment] Unlike Comment Success',
	props<{ commentId: number }>()
);
export const undislikeCommentSuccess = createAction(
	'[Comment] Undislike Comment Success',
	props<{ commentId: number }>()
);
export const updateCommentReactionSuccess = createAction(
	'[Comment] Update Comment Reaction Success',
	props<{ commentId: number; isLike: boolean }>()
);

export const commentReactionFailure = createAction(
	'[Comment] Comment Reaction Failure',
	props<{ error: string }>()
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
