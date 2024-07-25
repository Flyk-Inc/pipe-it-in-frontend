import { createReducer, on } from '@ngrx/store';
import * as GroupProfileActions from './group-profile.actions';
import { GroupProfileState, initialState } from './group-profile.state';

export const groupProfileReducer = createReducer(
	initialState,
	on(
		GroupProfileActions.loadGroup,
		(state): GroupProfileState => ({
			...state,
			loading: true,
			error: null,
		})
	),
	on(
		GroupProfileActions.loadGroupSuccess,
		(state, { group }): GroupProfileState => ({
			...state,
			group,
			loading: false,
		})
	),
	on(
		GroupProfileActions.loadGroupFailure,
		(state, { error }): GroupProfileState => ({
			...state,
			error,
			loading: false,
		})
	),
	on(
		GroupProfileActions.joinGroup,
		(state): GroupProfileState => ({
			...state,
			loading: true,
			error: null,
		})
	),
	on(
		GroupProfileActions.joinGroupSuccess,
		(state, { groupId }): GroupProfileState => ({
			...state,
			group: state.group ? { ...state.group, id: groupId } : null,
			loading: false,
		})
	),
	on(
		GroupProfileActions.joinGroupFailure,
		(state, { error }): GroupProfileState => ({
			...state,
			error,
			loading: false,
		})
	),
	on(
		GroupProfileActions.requestGroupAccess,
		(state): GroupProfileState => ({
			...state,
			loading: true,
			error: null,
		})
	),
	on(
		GroupProfileActions.requestGroupAccessSuccess,
		(state, { request }): GroupProfileState => ({
			...state,
			group: state.group
				? {
						...state.group,
						receivedGroupRequests: [
							...state.group.receivedGroupRequests,
							request,
						],
					}
				: null,
			loading: false,
		})
	),
	on(
		GroupProfileActions.requestGroupAccessFailure,
		(state, { error }): GroupProfileState => ({
			...state,
			error,
			loading: false,
		})
	),
	on(
		GroupProfileActions.loadGroupPosts,
		(state): GroupProfileState => ({
			...state,
			loading: true,
			error: null,
		})
	),
	on(
		GroupProfileActions.loadGroupPostsSuccess,
		(state, { posts }): GroupProfileState => ({
			...state,
			posts,
			loading: false,
		})
	),
	on(
		GroupProfileActions.loadGroupPostsFailure,
		(state, { error }): GroupProfileState => ({
			...state,
			error,
			loading: false,
		})
	)
);
