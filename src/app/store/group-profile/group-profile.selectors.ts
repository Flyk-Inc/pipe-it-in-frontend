import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupProfileState } from './group-profile.state';

export const selectGroupProfileState =
	createFeatureSelector<GroupProfileState>('groupProfile');

export const selectGroup = createSelector(
	selectGroupProfileState,
	(state: GroupProfileState) => state.group
);

export const selectGroupPosts = createSelector(
	selectGroupProfileState,
	(state: GroupProfileState) => state.posts
);

export const selectGroupLoading = createSelector(
	selectGroupProfileState,
	(state: GroupProfileState) => state.loading
);

export const selectGroupError = createSelector(
	selectGroupProfileState,
	(state: GroupProfileState) => state.error
);
