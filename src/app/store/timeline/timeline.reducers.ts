import { createReducer, on } from '@ngrx/store';
import * as TimelineActions from './timeline.actions';
import { initialState, TimelineState } from './timeline.state';

export const timelineReducer = createReducer(
	initialState,
	on(
		TimelineActions.loadPosts,
		(state): TimelineState => ({
			...state,
			loading: true,
			error: null,
		})
	),
	on(
		TimelineActions.loadPostsSuccess,
		(state, { posts }): TimelineState => ({
			...state,
			posts,
			loading: false,
		})
	),
	on(
		TimelineActions.loadPostsFailure,
		(state, { error }): TimelineState => ({
			...state,
			loading: false,
			error,
		})
	),
	on(
		TimelineActions.createPost,
		(state): TimelineState => ({
			...state,
			loading: true,
			error: null,
		})
	),
	on(
		TimelineActions.createPostSuccess,
		(state, { post }): TimelineState => ({
			...state,
			posts: [post, ...state.posts],
			loading: false,
		})
	),
	on(
		TimelineActions.createPostFailure,
		(state, { error }): TimelineState => ({
			...state,
			loading: false,
			error,
		})
	)
);
