import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import { initialState, ProfileState } from './profile.state';
import { environment } from '../../../environments/environment';
import {
	uploadProfilePictureFailure,
	uploadProfilePictureSuccess,
} from './profile.actions';

export const profileReducers = createReducer(
	initialState,
	on(
		ProfileActions.loadProfileSuccess,
		(state, { user }): ProfileState => ({
			...state,
			user,
			profilePictureUrl: user.profilePicture
				? `${environment.backendUrl}/files/${user.profilePicture.id}`
				: initialState.profilePictureUrl,
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
		})
	),
	on(
		ProfileActions.setProfilePictureUrl,
		(state, { profilePictureUrl }): ProfileState => ({
			...state,
			profilePictureUrl,
		})
	),
	on(
		ProfileActions.pinPostSuccess,
		(state, { postId }): ProfileState => ({
			...state,
			user: state.user ? { ...state.user, pinnedPost: postId } : null,
		})
	),
	on(
		ProfileActions.unpinPostSuccess,
		(state): ProfileState => ({
			...state,
			user: state.user ? { ...state.user, pinnedPost: null } : null,
		})
	),
	on(ProfileActions.deletePostSuccess, (state, { postId }) => ({
		...state,
		posts: state.posts.filter(post => post.id !== postId),
		user:
			state.user?.pinnedPost === postId
				? { ...state.user, pinnedPost: null }
				: state.user,
	})),
	on(
		ProfileActions.loadProfileGroupsFailure,
		(state, { error }): ProfileState => ({
			...state,
			error,
		})
	),

	on(
		ProfileActions.updateProfileSuccess,
		(state, { user }): ProfileState => ({
			...state,
			user,
		})
	),

	on(
		ProfileActions.updateProfileFailure,
		(state, { error }): ProfileState => ({
			...state,
			error,
		})
	),

	on(
		uploadProfilePictureSuccess,
		(state, { updatedUser }): ProfileState => ({
			...state,
			profilePictureUrl: updatedUser.profilePicture
				? `${environment.backendUrl}/files/${updatedUser.profilePicture.id}`
				: initialState.profilePictureUrl,
		})
	),
	on(
		uploadProfilePictureFailure,
		(state, { error }): ProfileState => ({
			...state,
			error,
		})
	)
);
