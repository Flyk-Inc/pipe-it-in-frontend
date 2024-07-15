import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserProfileState } from './user-profile.state';
import { TimelinePost } from '../../models/post.model';

const getUserProfileState =
	createFeatureSelector<UserProfileState>('userProfile');

export const selectUserProfile = createSelector(
	getUserProfileState,
	(state: UserProfileState) => state.user
);

export const selectUserProfilePictureUrl = createSelector(
	getUserProfileState,
	(state: UserProfileState) => state.profilePictureUrl
);

export const selectUserProfilePosts = createSelector(
	getUserProfileState,
	(state: UserProfileState) => {
		const pinnedPostId = state.user?.pinnedPost;
		return state.userPosts.filter(
			(post: TimelinePost) => post.id !== pinnedPostId
		);
	}
);

export const selectUserProfileGroups = createSelector(
	getUserProfileState,
	(state: UserProfileState) => state.userGroups
);

export const selectPinnedPost = createSelector(
	getUserProfileState,
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
		getUserProfileState,
		(state: UserProfileState) =>
			!!state.user?.followers.some(
				request => request.follower.id === currentUserId
			)
	);
