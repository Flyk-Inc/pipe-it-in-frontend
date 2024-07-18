import { createAction, props } from '@ngrx/store';
import { TimelinePipeline } from '../../models/pipeline.model';

export const loadPersonalPipelines = createAction(
	'[Pipeline Timeline] Load Pipeline'
);
export const loadPipelinesSuccess = createAction(
	'[Pipeline Timeline] Load Pipelines Success',
	props<{ pipelines: TimelinePipeline[] }>()
);
export const loadPipelinesFailure = createAction(
	'[Pipeline Timeline] Load Pipelines Failure',
	props<{ error: string }>()
);

// export const createPipeline = createAction(
// 	'[Pipeline Timeline] Create Pipeline',
// 	props<{ createPipelineDTO: CreatePipelineDTO }>()
// );
// export const createPipelineSuccess = createAction(
// 	'[Pipeline Timeline] Create Pipeline Success',
// 	props<{ pipeline: TimelinePipeline }>()
// );
// export const createPipelineFailure = createAction(
// 	'[Pipeline Timeline] Create Pipeline Failure',
// 	props<{ error: string }>()
// );
