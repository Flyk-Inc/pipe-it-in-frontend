import { createReducer, on } from '@ngrx/store';
import { PipelineTimelineState, initialState } from './pipeline.state';
import * as PipelineTimelineActions from './pipeline.actions';

export const pipelineTimelineReducer = createReducer(
	initialState,
	on(
		PipelineTimelineActions.loadPersonalPipelines,
		(state): PipelineTimelineState => ({
			...state,
			loading: true,
			error: null,
		})
	),
	on(
		PipelineTimelineActions.loadPipelinesSuccess,
		(state, { pipelines }): PipelineTimelineState => {
			return {
				...state,
				personalPipelines: pipelines,
				loading: false,
			};
		}
	),
	on(
		PipelineTimelineActions.loadPipelinesFailure,
		(state, { error }): PipelineTimelineState => ({
			...state,
			loading: false,
			error,
		})
	),
	// on(
	// 	PipelineTimelineActions.createPipeline,
	// 	(state): PipelineTimelineState => ({
	// 		...state,
	// 		loading: true,
	// 		error: null,
	// 	})
	// ),
	// on(
	// 	PipelineTimelineActions.createPipelineSuccess,
	// 	(state, { pipeline }): PipelineTimelineState => ({
	// 		...state,
	// 		personalPipelines: [pipeline, ...state.personalPipelines],
	// 		loading: false,
	// 	})
	// ),
	// on(
	// 	PipelineTimelineActions.createPipelineFailure,
	// 	(state, { error }): PipelineTimelineState => ({
	// 		...state,
	// 		loading: false,
	// 		error,
	// 	})
	// )
);
