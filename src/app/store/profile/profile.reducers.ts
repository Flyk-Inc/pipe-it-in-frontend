import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import { initialState, ProfileState } from './profile.state';

export const profileReducers = createReducer(
	initialState,
	on(
		ProfileActions.loadProfileSuccess,
		(state, { user }): ProfileState => ({
			...state,
			user,
			error: null,
		})
	),
	on(
		ProfileActions.loadProfileFailure,
		(state, { error }): ProfileState => ({
			...state,
			error,
		})
	),
	on(
		ProfileActions.loadProfilePostsSuccess,
		(state, { posts }): ProfileState => ({
			...state,
			posts,
			error: null,
		})
	),
	on(
		ProfileActions.loadProfilePostsFailure,
		(state, { error }): ProfileState => ({
			...state,
			error,
		})
	),
	on(
		ProfileActions.loadProfileGroupsSuccess,
		(state, { groups }): ProfileState => ({
			...state,
			groups,
			error: null,
		})
	),
	on(ProfileActions.setProfilePictureUrl, (state, { profilePictureUrl }) => ({
		...state,
		profilePictureUrl,
	})),
	on(
		ProfileActions.loadProfileGroupsFailure,
		(state, { error }): ProfileState => ({
			...state,
			error,
		})
	)
);
