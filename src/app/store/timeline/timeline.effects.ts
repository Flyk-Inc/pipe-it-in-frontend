import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as TimelineActions from './timeline.actions';
import { SocialService } from '../../service/social.service';

@Injectable()
export class TimelineEffects {
	loadPosts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(TimelineActions.loadPosts),
			mergeMap(() =>
				this.socialService.getTimeLinePostsTest().pipe(
					map(posts => TimelineActions.loadPostsSuccess({ posts })),
					catchError(error =>
						of(TimelineActions.loadPostsFailure({ error: error.message }))
					)
				)
			)
		);
	});

	createPost$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(TimelineActions.createPost),
			mergeMap(({ createPostDTO }) =>
				this.socialService.createPost(createPostDTO).pipe(
					map(post => {
						this.socialService.newPostAdded.next(post);
						return TimelineActions.createPostSuccess({ post });
					}),
					catchError(error =>
						of(TimelineActions.createPostFailure({ error: error.message }))
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
