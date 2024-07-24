import { createReducer, on } from '@ngrx/store';
import { initialState, PostState } from './post.state';
import {
	loadPost,
	loadPostSuccess,
	loadPostFailure,
	loadPostCommentsSuccess,
	loadPostCommentsFailure,
	createCommentSuccess,
	createCommentFailure,
	likeCommentSuccess,
	dislikeCommentSuccess,
	unlikeCommentSuccess,
	undislikeCommentSuccess,
	updateCommentReactionSuccess,
	commentReactionFailure,
} from './post.actions';
import { PostComment } from '../../models/post.model';

export const postReducer = createReducer(
	initialState,
	on(
		loadPost,
		(state): PostState => ({
			...state,
			selectedPost: null,
			error: null,
		})
	),
	on(
		loadPostSuccess,
		(state, { post }): PostState => ({
			...state,
			currentUserId: post.user.id,
			selectedPost: post,
			error: null,
		})
	),
	on(
		loadPostFailure,
		(state, { error }): PostState => ({
			...state,
			selectedPost: null,
			error,
		})
	),
	on(
		loadPostCommentsSuccess,
		(state, { comments }): PostState => ({
			...state,
			comments,
			error: null,
		})
	),
	on(
		loadPostCommentsFailure,
		(state, { error }): PostState => ({
			...state,
			comments: [],
			error,
		})
	),
	on(createCommentSuccess, (state, { comment }): PostState => ({
		...state,
		comments: [...state.comments, comment],
		error: null,
	})),
	on(createCommentFailure, (state, { error }): PostState => ({
		...state,
		error,
	})),
	on(likeCommentSuccess, (state, { commentId }): PostState => ({
		...state,
		comments: state.comments.map(comment =>
			comment.id === commentId
				? {
						...comment,
						reactions: [
							...comment.reactions,
							{ user: { id: state.currentUserId }, isLike: true },
						],
					}
				: comment
		) as PostComment[],
	})),
	on(dislikeCommentSuccess, (state, { commentId }) => ({
		...state,
		comments: state.comments.map(comment =>
			comment.id === commentId
				? {
						...comment,
						reactions: [
							...comment.reactions,
							{ user: { id: state.currentUserId }, isLike: false },
						],
					}
				: comment
		) as PostComment[],
	})),
	on(unlikeCommentSuccess, (state, { commentId }) => ({
		...state,
		comments: state.comments.map(comment =>
			comment.id === commentId
				? {
						...comment,
						reactions: comment.reactions.filter(
							reaction =>
								reaction.user.id !== state.currentUserId || !reaction.isLike
						),
					}
				: comment
		),
	})),
	on(undislikeCommentSuccess, (state, { commentId }) => ({
		...state,
		comments: state.comments.map(comment =>
			comment.id === commentId
				? {
						...comment,
						reactions: comment.reactions.filter(
							reaction =>
								reaction.user.id !== state.currentUserId || reaction.isLike
						),
					}
				: comment
		),
	})),
	on(updateCommentReactionSuccess, (state, { commentId, isLike }) => ({
		...state,
		comments: state.comments.map(comment =>
			comment.id === commentId
				? {
						...comment,
						reactions: comment.reactions.map(reaction =>
							reaction.user.id === state.currentUserId
								? { ...reaction, isLike }
								: reaction
						),
					}
				: comment
		),
	})),
	on(commentReactionFailure, (state, { error }): PostState => ({
		...state,
		error,
	}))
);
