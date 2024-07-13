import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ProfileActions from './profile.actions';
import { SocialService } from '../../service/social.service';
import { AuthenticationService } from '../../auth/authentication.service';

@Injectable()
export class ProfileEffects {
	loadProfile$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProfileActions.loadProfile),
			mergeMap(() =>
				this.authService.currentUserSource.pipe(
					map(user => {
						if (user) {
							return ProfileActions.loadProfileSuccess({ user });
						} else {
							this.authService.loadAuthenticatedUser();
							return ProfileActions.loadProfileFailure({
								error: 'User not authenticated',
							});
						}
					}),
					catchError(error => of(ProfileActions.loadProfileFailure({ error })))
				)
			)
		);
	});

	loadProfilePosts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProfileActions.loadProfilePosts),
			mergeMap(action =>
				this.socialService.getUserPosts(action.userId).pipe(
					map(posts => ProfileActions.loadProfilePostsSuccess({ posts })),
					catchError(error =>
						of(ProfileActions.loadProfilePostsFailure({ error }))
					)
				)
			)
		);
	});

	loadProfileGroups$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProfileActions.loadProfileGroups),
			mergeMap(() =>
				this.socialService.getUserGroups().pipe(
					map(groups => ProfileActions.loadProfileGroupsSuccess({ groups })),
					catchError(error =>
						of(ProfileActions.loadProfileGroupsFailure({ error }))
					)
				)
			)
		);
	});

	pinPost$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProfileActions.pinPost),
			mergeMap(action =>
				this.socialService.pinPost(action.postId).pipe(
					map(() => ProfileActions.pinPostSuccess({ postId: action.postId })),
					catchError(error => of(ProfileActions.loadProfileFailure({ error })))
				)
			)
		);
	});

	unpinPost$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProfileActions.unpinPost),
			mergeMap(() =>
				this.socialService.unpinPost().pipe(
					map(() => ProfileActions.unpinPostSuccess()),
					catchError(error => of(ProfileActions.loadProfileFailure({ error })))
				)
			)
		);
	});

	deletePost$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProfileActions.deletePost),
			mergeMap(action =>
				this.socialService.deletePost(action.postId).pipe(
					map(() =>
						ProfileActions.deletePostSuccess({ postId: action.postId })
					),
					catchError(error => of(ProfileActions.loadProfileFailure({ error })))
				)
			)
		);
	});

	constructor(
		private actions$: Actions,
		private socialService: SocialService,
		private authService: AuthenticationService
	) {}
}
