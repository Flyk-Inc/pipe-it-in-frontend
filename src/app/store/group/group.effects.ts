import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as GroupActions from './group.actions';
import { SocialService } from '../../service/social.service';

@Injectable()
export class GroupEffects {
	loadGroups$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(GroupActions.loadGroups),
			mergeMap(() =>
				this.socialService.getGroups().pipe(
					map(groups => GroupActions.loadGroupsSuccess({ groups })),
					catchError(error =>
						of(GroupActions.loadGroupsFailure({ error: error.message }))
					)
				)
			)
		);
	});

	createGroup$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(GroupActions.createGroup),
			mergeMap(action =>
				this.socialService.createGroup(action.group).pipe(
					map(() => GroupActions.loadGroups()),
					catchError(error =>
						of(GroupActions.createGroupFailure({ error: error.message }))
					)
				)
			)
		);
	});

	leaveGroup$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(GroupActions.leaveGroup),
			mergeMap(action =>
				this.socialService.leaveGroup(action.groupId).pipe(
					map(() =>
						GroupActions.leaveGroupSuccess({ groupId: action.groupId })
					),
					catchError(error =>
						of(GroupActions.leaveGroupFailure({ error: error.message }))
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
