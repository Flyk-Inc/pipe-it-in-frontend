import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PostState } from './post.state';

export const selectPostState = createFeatureSelector<PostState>('post');

export const selectPost = createSelector(
	selectPostState,
	(state: PostState) => state.selectedPost
);

export const selectPostComments = createSelector(
	selectPostState,
	(state: PostState) =>
		state.comments.filter(comment => comment.parent === null)
);
