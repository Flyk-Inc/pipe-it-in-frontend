import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as PostActions from './post.actions';
import { SocialService } from '../../service/social.service';

@Injectable()
export class PostEffects {
	loadPost$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(PostActions.loadPost),
			mergeMap(action =>
				this.socialService.getPost(action.postId).pipe(
					map(post => PostActions.loadPostSuccess({ post })),
					catchError(error =>
						of(PostActions.loadPostFailure({ error: error.message }))
					)
				)
			)
		);
	});

	loadPostComments$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(PostActions.loadPostComments),
			mergeMap(action =>
				this.socialService.getPostComments(action.postId).pipe(
					map(comments => PostActions.loadPostCommentsSuccess({ comments })),
					catchError(error =>
						of(PostActions.loadPostCommentsFailure({ error: error.message }))
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
