import { createReducer, on } from '@ngrx/store';
import { GroupState, initialState } from './group.state';
import {
	createGroupFailure,
	createGroupSuccess,
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
	on(createGroupSuccess, (state, { group }) => ({
		...state,
		groups: [...state.groups, group],
		error: null,
	})),
	on(createGroupFailure, (state, { error }) => ({
		...state,
		error,
	}))
);
