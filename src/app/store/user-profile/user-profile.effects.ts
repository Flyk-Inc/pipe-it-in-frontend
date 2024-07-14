import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, withLatestFrom } from 'rxjs';
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
  loadUserProfileSuccess, setPinnedPost,
  unfollowUser,
  unfollowUserFailure,
  unfollowUserSuccess,
} from './user-profile.actions';
import { select, Store } from '@ngrx/store';
import { selectProfileUser } from '../profile/profile.selectors';
import { UserProfileState } from './user-profile.state';

@Injectable()
export class UserProfileEffects {
  loadUserProfile$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(loadUserProfile),
      switchMap(action =>
        this.socialService.getUserProfile(action.userId).pipe(
          map(user => loadUserProfileSuccess({ user })),
          catchError(error => of(loadUserProfileFailure({ error })))
        )
      )
    ) }
  );

  loadUserProfileGroups$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(loadUserProfileGroups),
      switchMap(action =>
        this.socialService.getUserGroups(action.userId).pipe(
          map(groups => loadUserProfileGroupsSuccess({ groups })),
          catchError(error => of(loadUserProfileGroupsFailure({ error })))
        )
      )
    ) }
  );

  loadUserProfilePosts$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(loadUserProfilePosts),
      switchMap(action =>
        this.socialService.getUserPosts(action.userId).pipe(
          map(posts => loadUserProfilePostsSuccess({ posts })),
          catchError(error => of(loadUserProfilePostsFailure({ error })))
        )
      )
    ) }
  );

  followUser$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(followUser),
      concatLatestFrom(() => this.store.select((selectProfileUser))),
      switchMap(([action, currentUser]) =>
        this.socialService.followUser(action.userId).pipe(
          map(() => followUserSuccess({ userId: action.userId, currentUser: currentUser! })),
          catchError(error => of(followUserFailure({ error })))
        )
      )
    ) }
  );

  unfollowUser$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(unfollowUser),
      switchMap(action =>
        this.socialService.unfollowUser(action.userId).pipe(
          map(() => unfollowUserSuccess()),
          catchError(error => of(unfollowUserFailure({ error })))
        )
      )
    ) }
  );

  setPinnedPost$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(setPinnedPost),
      switchMap(action =>
        this.socialService.pinPost(action.postId).pipe(
          map(() => setPinnedPost({ postId: action.postId })),
          catchError(error => of(loadUserProfileFailure({ error: error.message })))
        )
      )
    ) }
  );

  constructor(
    private actions$: Actions,
    private socialService: SocialService,
    private store: Store<UserProfileState>
  ) {}
}
