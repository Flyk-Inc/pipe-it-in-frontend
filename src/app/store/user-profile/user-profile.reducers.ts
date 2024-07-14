import { createReducer, on } from '@ngrx/store';
import {
  followUserSuccess,
  loadUserProfileFailure,
  loadUserProfileGroupsFailure,
  loadUserProfileGroupsSuccess,
  loadUserProfilePostsFailure,
  loadUserProfilePostsSuccess,
  loadUserProfileSuccess,
  setPinnedPost,
  setUserProfilePictureUrl,
  unfollowUserSuccess,
} from './user-profile.actions';
import { initialState } from './user-profile.state';

export const userProfileReducers = createReducer(
  initialState,
  on(loadUserProfileSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(loadUserProfileGroupsSuccess, (state, { groups }) => ({
    ...state,
    userGroups: groups,
  })),
  on(loadUserProfilePostsSuccess, (state, { posts }) => ({
    ...state,
    userPosts: posts,
  })),
  on(setUserProfilePictureUrl, (state, { profilePictureUrl }) => ({
    ...state,
    profilePictureUrl,
  })),
  on(followUserSuccess, (state, { currentUser }) => ({
    ...state,
    user: state.user ? {
      ...state.user,
      sentFollowRequests: [
        ...state.user.sentFollowRequests,
        {
          id: Date.now(), // Use a unique identifier for id
          user: state.user,
          follower: currentUser,
          isAccepted: true
        }
      ]
    } : null,
  })),
  on(unfollowUserSuccess, state => ({
    ...state,
    user: state.user ? {
      ...state.user,
      sentFollowRequests: state.user.sentFollowRequests.filter(request => request.user.id !== state.user!.id)
    } : null,
  })),
  on(loadUserProfileFailure, loadUserProfileGroupsFailure, loadUserProfilePostsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(setPinnedPost, (state, { postId }) => ({
    ...state,
    pinnedPost: postId,
  }))
);
