import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SocialService } from '../../service/social.service';
import {
	followUser,
	followUserFailure,
	followUserSuccess,
	loadUserProfile,
	loadUserProfileFailure,
	loadUserProfileGroups,
	loadUserProfileGroupsFailure,
	loadUserProfileGroupsSuccess,
	loadUserProfilePosts,
	loadUserProfilePostsFailure,
	loadUserProfilePostsSuccess,
	loadUserProfileSuccess,
	sendFollowRequest,
	sendFollowRequestFailure,
	sendFollowRequestSuccess,
	unfollowUser,
	unfollowUserFailure,
	unfollowUserSuccess,
} from './user-profile.actions';

@Injectable()
export class UserProfileEffects {
	loadUserProfile$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(loadUserProfile),
			switchMap(action =>
				this.socialService.getUserProfile(action.userId).pipe(
					map(user => loadUserProfileSuccess({ user })),
					catchError(error => of(loadUserProfileFailure({ error })))
				)
			)
		);
	});

	loadUserProfileGroups$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(loadUserProfileGroups),
			switchMap(action =>
				this.socialService.getUserGroups(action.userId).pipe(
					map(groups => loadUserProfileGroupsSuccess({ groups })),
					catchError(error => of(loadUserProfileGroupsFailure({ error })))
				)
			)
		);
	});

	loadUserProfilePosts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(loadUserProfilePosts),
			switchMap(action =>
				this.socialService.getUserPosts(action.userId).pipe(
					map(posts => loadUserProfilePostsSuccess({ posts })),
					catchError(error => of(loadUserProfilePostsFailure({ error })))
				)
			)
		);
	});

	followUser$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(followUser),
			switchMap(action =>
				this.socialService.followUser(action.userId).pipe(
					map(() =>
						followUserSuccess({
							userId: action.userId,
							currentUser: action.currentUser,
						})
					),
					catchError(error => of(followUserFailure({ error })))
				)
			)
		);
	});

	unfollowUser$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(unfollowUser),
			switchMap(action =>
				this.socialService.unfollowUser(action.userId).pipe(
					map(() =>
						unfollowUserSuccess({
							userId: action.userId,
							currentUser: action.currentUser,
						})
					),
					catchError(error => of(unfollowUserFailure({ error })))
				)
			)
		);
	});

	sendFollowRequest$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(sendFollowRequest),
			mergeMap(action =>
				this.socialService.sendFollowRequest(action.userId).pipe(
					map(() => sendFollowRequestSuccess({ user: action.currentUser })),
					catchError(error => of(sendFollowRequestFailure({ error })))
				)
			)
		);
	});

	constructor(
		private actions$: Actions,
		private socialService: SocialService
	) {}
}
