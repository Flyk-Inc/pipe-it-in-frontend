import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as GroupProfileActions from './group-profile.actions';
import { SocialService } from '../../service/social.service';

@Injectable()
export class GroupProfileEffects {
	loadGroup$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(GroupProfileActions.loadGroup),
			mergeMap(action =>
				this.socialService.getGroup(action.groupId).pipe(
					map(group => GroupProfileActions.loadGroupSuccess({ group })),
					catchError(error =>
						of(GroupProfileActions.loadGroupFailure({ error: error.message }))
					)
				)
			)
		);
	});

	joinGroup$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(GroupProfileActions.joinGroup),
			mergeMap(action =>
				this.socialService.joinGroup(action.groupId).pipe(
					map(() =>
						GroupProfileActions.joinGroupSuccess({ groupId: action.groupId })
					),
					catchError(error =>
						of(GroupProfileActions.joinGroupFailure({ error: error.message }))
					)
				)
			)
		);
	});

	requestGroupAccess$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(GroupProfileActions.requestGroupAccess),
			mergeMap(action =>
				this.socialService.requestGroupAccess(action.groupId).pipe(
					map(request =>
						GroupProfileActions.requestGroupAccessSuccess({
							groupId: action.groupId,
							request,
						})
					),
					catchError(error =>
						of(
							GroupProfileActions.requestGroupAccessFailure({
								error: error.message,
							})
						)
					)
				)
			)
		);
	});

	loadGroupPosts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(GroupProfileActions.loadGroupPosts),
			mergeMap(action =>
				this.socialService.getGroupPosts(action.groupId).pipe(
					map(posts => GroupProfileActions.loadGroupPostsSuccess({ posts })),
					catchError(error =>
						of(
							GroupProfileActions.loadGroupPostsFailure({
								error: error.message,
							})
						)
					)
				)
			)
		);
	});

	constructor(
		private actions$: Actions,
		private socialService: SocialService
	) {}
}
