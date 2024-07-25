import { createReducer, on } from '@ngrx/store';
import { GroupState, initialState } from './group.state';
import {
	createGroupFailure,
	createGroupSuccess,
	leaveGroupFailure,
	leaveGroupSuccess,
	loadGroups,
	loadGroupsFailure,
	loadGroupsSuccess,
} from './group.actions';

export const groupReducer = createReducer(
	initialState,
	on(
		loadGroups,
		(state): GroupState => ({
			...state,
			error: null,
		})
	),
	on(
		loadGroupsSuccess,
		(state, { groups }): GroupState => ({
			...state,
			groups,
			error: null,
		})
	),
	on(
		loadGroupsFailure,
		(state, { error }): GroupState => ({
			...state,
			error,
		})
	),
	on(
		createGroupSuccess,
		(state, { group }): GroupState => ({
			...state,
			groups: [...state.groups, group],
			error: null,
		})
	),
	on(
		createGroupFailure,
		(state, { error }): GroupState => ({
			...state,
			error,
		})
	),
	on(
		leaveGroupSuccess,
		(state, { groupId }): GroupState => ({
			...state,
			groups: state.groups.filter(group => group.id !== groupId),
			error: null,
		})
	),
	on(
		leaveGroupFailure,
		(state, { error }): GroupState => ({
			...state,
			error,
		})
	)
);
