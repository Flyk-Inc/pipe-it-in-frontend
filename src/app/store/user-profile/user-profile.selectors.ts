import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserProfileState } from './user-profile.state';

const getUserProfileState = createFeatureSelector<UserProfileState>('userProfile');

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
  (state: UserProfileState) => state.userPosts
);

export const selectUserProfileGroups = createSelector(
  getUserProfileState,
  (state: UserProfileState) => state.userGroups
);

export const selectPinnedPost = createSelector(
  getUserProfileState,
  (state: UserProfileState) => state.userPosts.find(post => post.id === state.pinnedPost) || null
);

export const selectIsFollowing = createSelector(
  getUserProfileState,
  (state: UserProfileState, props: { currentUserId: number }) =>
    !!state.user?.sentFollowRequests.some(request => request.user.id === props.currentUserId && request.isAccepted)
);
