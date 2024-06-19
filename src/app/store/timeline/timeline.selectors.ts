import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TimelineState } from './timeline.state';

export const selectTimelineState = createFeatureSelector<TimelineState>('timeline');

export const selectAllPosts = createSelector(
  selectTimelineState,
  (state: TimelineState) => state.posts
);

export const selectLoading = createSelector(
  selectTimelineState,
  (state: TimelineState) => state.loading
);

export const selectError = createSelector(
  selectTimelineState,
  (state: TimelineState) => state.error
);
