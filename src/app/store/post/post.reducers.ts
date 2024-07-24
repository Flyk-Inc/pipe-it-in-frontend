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
} from './post.actions';

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
	on(createCommentSuccess, (state, { comment }) => ({
		...state,
		comments: [...state.comments, comment],
		error: null,
	})),
	on(createCommentFailure, (state, { error }) => ({
		...state,
		error,
	}))
);