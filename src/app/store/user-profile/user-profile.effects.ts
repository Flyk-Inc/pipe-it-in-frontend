import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
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
	unfollowUser,
	unfollowUserFailure,
	unfollowUserSuccess,
} from './user-profile.actions';
import { Store } from '@ngrx/store';
import { UserProfileState } from './user-profile.state';

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

	followUser$ = createEffect(() =>
		this.actions$.pipe(
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
		)
	);

	unfollowUser$ = createEffect(() =>
		this.actions$.pipe(
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
		)
	);

	constructor(
		private actions$: Actions,
		private socialService: SocialService,
		private store: Store<UserProfileState>
	) {}
}
