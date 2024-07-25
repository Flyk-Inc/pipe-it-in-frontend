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

	createComment$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(PostActions.createComment),
			mergeMap(action =>
				this.socialService.createComment(action.createCommentDTO).pipe(
					map(comment => PostActions.createCommentSuccess({ comment })),
					catchError(error =>
						of(PostActions.createCommentFailure({ error: error.message }))
					)
				)
			)
		);
	});

	replyToComment$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(PostActions.replyToComment),
			mergeMap(action =>
				this.socialService.replyToComment(action.createCommentDTO).pipe(
					map(() => {
						return PostActions.loadPostComments({
							postId: action.createCommentDTO.postId,
						});
					}),
					catchError(error =>
						of({
							type: '[Comment] Reply to Comment Failure',
							error,
						})
					)
				)
			)
		);
	});

	likeComment$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(PostActions.likeComment),
			mergeMap(action =>
				this.socialService.reactToComment(action.commentId, true).pipe(
					map(() =>
						PostActions.likeCommentSuccess({ commentId: action.commentId })
					),
					catchError(error => of(PostActions.commentReactionFailure({ error })))
				)
			)
		);
	});

	dislikeComment$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(PostActions.dislikeComment),
			mergeMap(action =>
				this.socialService.reactToComment(action.commentId, false).pipe(
					map(() =>
						PostActions.dislikeCommentSuccess({ commentId: action.commentId })
					),
					catchError(error => of(PostActions.commentReactionFailure({ error })))
				)
			)
		);
	});

	unlikeComment$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(PostActions.unlikeComment),
			mergeMap(action =>
				this.socialService.removeReactionFromComment(action.commentId).pipe(
					map(() =>
						PostActions.unlikeCommentSuccess({ commentId: action.commentId })
					),
					catchError(error => of(PostActions.commentReactionFailure({ error })))
				)
			)
		);
	});

	undislikeComment$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(PostActions.undislikeComment),
			mergeMap(action =>
				this.socialService.removeReactionFromComment(action.commentId).pipe(
					map(() =>
						PostActions.undislikeCommentSuccess({ commentId: action.commentId })
					),
					catchError(error => of(PostActions.commentReactionFailure({ error })))
				)
			)
		);
	});

	updateCommentReaction$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(PostActions.updateCommentReaction),
			mergeMap(action =>
				this.socialService
					.updateReactionOnComment(action.commentId, action.isLike)
					.pipe(
						map(() =>
							PostActions.updateCommentReactionSuccess({
								commentId: action.commentId,
								isLike: action.isLike,
							})
						),
						catchError(error =>
							of(PostActions.commentReactionFailure({ error }))
						)
					)
			)
		);
	});

	likePost$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(PostActions.likePost),
			mergeMap(action =>
				this.socialService.reactToPost(action.postId, true).pipe(
					map(() => PostActions.likePostSuccess({ postId: action.postId })),
					catchError(error => of(PostActions.postReactionFailure({ error })))
				)
			)
		);
	});

	unlikePost$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(PostActions.unlikePost),
			mergeMap(action =>
				this.socialService.removeReactionFromPost(action.postId).pipe(
					map(() => PostActions.unlikePostSuccess({ postId: action.postId })),
					catchError(error => of(PostActions.postReactionFailure({ error })))
				)
			)
		);
	});

	constructor(
		private actions$: Actions,
		private socialService: SocialService
	) {}
}
