import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
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

	loadProfilePictureUrl$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProfileActions.loadProfileSuccess),
			switchMap(({ user }) =>
				user.profilePicture
					? this.socialService.getUserProfilePicture().pipe(
							map(profilePictureUrl =>
								ProfileActions.setProfilePictureUrl({ profilePictureUrl })
							),
							catchError(error =>
								of(ProfileActions.loadProfileFailure({ error }))
							)
						)
					: of(
							ProfileActions.setProfilePictureUrl({
								profilePictureUrl:
									'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
							})
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
