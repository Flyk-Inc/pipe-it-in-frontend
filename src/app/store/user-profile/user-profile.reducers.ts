import { createReducer, on } from '@ngrx/store';
import {
	followUserSuccess,
	getPinnedPostSuccess,
	loadUserProfileFailure,
	loadUserProfileGroupsFailure,
	loadUserProfileGroupsSuccess,
	loadUserProfilePostsFailure,
	loadUserProfilePostsSuccess,
	loadUserProfileSuccess,
	sendFollowRequestFailure,
	sendFollowRequestSuccess,
	setUserProfilePictureUrl,
	unfollowUserSuccess,
} from './user-profile.actions';
import { initialState, UserProfileState } from './user-profile.state';
import { UserDTO } from '../../auth/DTO/user.dto';

export const userProfileReducers = createReducer(
	initialState,
	on(
		loadUserProfileSuccess,
		(state, { user }): UserProfileState => ({
			...state,
			user,
		})
	),
	on(
		loadUserProfileGroupsSuccess,
		(state, { groups }): UserProfileState => ({
			...state,
			userGroups: groups,
		})
	),
	on(
		loadUserProfilePostsSuccess,
		(state, { posts }): UserProfileState => ({
			...state,
			userPosts: posts,
		})
	),
	on(
		setUserProfilePictureUrl,
		(state, { profilePictureUrl }): UserProfileState => ({
			...state,
			profilePictureUrl,
		})
	),
	on(
		followUserSuccess,
		(state, { currentUser }): UserProfileState => ({
			...state,
			user: {
				...state.user,
				followers: [
					...(state.user?.followers || []),
					{
						user: state.user,
						follower: currentUser,
					},
				],
			} as UserDTO,
		})
	),
	on(
		unfollowUserSuccess,
		(state, { currentUser }): UserProfileState => ({
			...state,
			user: {
				...state.user,
				followers: (state.user?.followers || []).filter(
					request => request.follower?.id !== currentUser.id
				),
			} as UserDTO,
		})
	),
	on(
		loadUserProfileFailure,
		loadUserProfileGroupsFailure,
		loadUserProfilePostsFailure,
		(state, { error }): UserProfileState => ({
			...state,
			error,
		})
	),
	on(
		getPinnedPostSuccess,
		(state, { post }): UserProfileState => ({
			...state,
			userPosts: [...state.userPosts, post],
		})
	),
	on(
		sendFollowRequestSuccess,
		(state, { user }): UserProfileState => ({
			...state,
			user: {
				...state.user,
				receivedFollowRequests: [
					...(state.user?.receivedFollowRequests || []),
					{ follower: user, user: state.user!, isAccepted: false },
				],
			} as UserDTO,
		})
	),

	on(
		sendFollowRequestFailure,
		(state, { error }): UserProfileState => ({
			...state,
			error,
		})
	)
);
