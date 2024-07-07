import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CodeTimelineState } from './code.state';

export const selectCodeCodeTimelineState =
	createFeatureSelector<CodeTimelineState>('codeTimeline');

export const selectAllPersonalCodes = createSelector(
	selectCodeCodeTimelineState,
	(state: CodeTimelineState) => state.personalCodes
);

export const selectCodeTimelineLoading = createSelector(
	selectCodeCodeTimelineState,
	(state: CodeTimelineState) => state.loading
);

export const selectCodeTimelineError = createSelector(
	selectCodeCodeTimelineState,
	(state: CodeTimelineState) => state.error
);
