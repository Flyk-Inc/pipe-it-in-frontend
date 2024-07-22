import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PipelineTimelineState } from './pipeline.state';

export const selectPipelinePipelineTimelineState =
	createFeatureSelector<PipelineTimelineState>('pipelineTimeline');

export const selectAllPersonalPipelines = createSelector(
	selectPipelinePipelineTimelineState,
	(state: PipelineTimelineState) => state.personalPipelines
);

export const selectPipelineTimelineLoading = createSelector(
	selectPipelinePipelineTimelineState,
	(state: PipelineTimelineState) => state.loading
);

export const selectPipelineTimelineError = createSelector(
	selectPipelinePipelineTimelineState,
	(state: PipelineTimelineState) => state.error
);
