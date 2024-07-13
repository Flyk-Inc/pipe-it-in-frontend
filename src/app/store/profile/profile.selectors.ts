import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.state';
import { TimelinePost } from '../../models/post.model';

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

export const selectPinnedPostId = createSelector(
	selectProfileState,
	(state: ProfileState) => state.pinnedPost
);

export const selectPinnedPost = createSelector(
	selectProfilePosts,
	selectPinnedPostId,
	(posts: TimelinePost[], pinnedPostId: number | null) => {
		return posts.find(post => post.id === pinnedPostId) || null;
	}
);

export const selectProfileError = createSelector(
	selectProfileState,
	(state: ProfileState) => state.error
);
