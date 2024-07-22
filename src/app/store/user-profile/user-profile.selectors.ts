import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserProfileState } from './user-profile.state';
import { TimelinePost } from '../../models/post.model';

const selectUserProfileState =
	createFeatureSelector<UserProfileState>('userProfile');

export const selectUserProfile = createSelector(
	selectUserProfileState,
	(state: UserProfileState) => state.user
);

export const selectUserProfilePictureUrl = createSelector(
	selectUserProfileState,
	(state: UserProfileState) => state.profilePictureUrl
);

export const selectUserProfilePosts = createSelector(
	selectUserProfileState,
	(state: UserProfileState) => {
		const pinnedPostId = state.user?.pinnedPost;
		return state.userPosts.filter(
			(post: TimelinePost) => post.id !== pinnedPostId
		);
	}
);

export const selectUserProfileGroups = createSelector(
	selectUserProfileState,
	(state: UserProfileState) => state.userGroups
);

export const selectPinnedPost = createSelector(
	selectUserProfileState,
	(state: UserProfileState) => {
		const pinnedPostId = state.user?.pinnedPost;
		return (
			state.userPosts.find((post: TimelinePost) => post.id === pinnedPostId) ||
			null
		);
	}
);

export const selectIsFollowing = (currentUserId: number) =>
	createSelector(
		selectUserProfileState,
		(state: UserProfileState) =>
			!!state.user?.followers.some(
				request => request.follower.id === currentUserId
			)
	);
