import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.state';

export const selectProfileState =
	createFeatureSelector<ProfileState>('profile');

export const selectProfileUser = createSelector(
	selectProfileState,
	(state: ProfileState) => state.user
);

export const selectProfilePosts = createSelector(
	selectProfileState,
	(state: ProfileState) => state.posts
);

export const selectProfileGroups = createSelector(
	selectProfileState,
	(state: ProfileState) => state.groups
);

export const selectProfilePictureUrl = createSelector(
	selectProfileState,
	(state: ProfileState) => state.profilePictureUrl
);

export const selectProfileError = createSelector(
	selectProfileState,
	(state: ProfileState) => state.error
);
