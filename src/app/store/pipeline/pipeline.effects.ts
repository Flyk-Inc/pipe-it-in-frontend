import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as PipelineTimelineActions from './pipeline.actions';
import { Store } from '@ngrx/store';
import { PipelineService } from '../../service/pipeline.service';

@Injectable()
export class PipelineTimelineEffects {
	loadPipelines$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(PipelineTimelineActions.loadPersonalPipelines),
			mergeMap(() =>
				this.pipelineService.getPersonalTimeLinePipelines().pipe(
					map(pipelines => {
						return PipelineTimelineActions.loadPipelinesSuccess({ pipelines });
					}),
					catchError(error =>
						of(
							PipelineTimelineActions.loadPipelinesFailure({
								error: error.message,
							})
						)
					)
				)
			)
		);
	});
	// createPipeline$ = createEffect(() => {
	// 	return this.actions$.pipe(
	// 		ofType(PipelineTimelineActions.createPipeline),
	// 		mergeMap(({ createPipelineDTO }) =>
	// 			this.pipelineService.createPipeline(createPipelineDTO).pipe(
	// 				map(pipeline => {
	// 					return PipelineTimelineActions.createPipelineSuccess({ pipeline });
	// 				}),
	// 				catchError(error =>
	// 					of(PipelineTimelineActions.createPipelineFailure({ error: error.message }))
	// 				)
	// 			)
	// 		)
	// 	);
	// });
	//
	constructor(
		private actions$: Actions,
		private pipelineService: PipelineService,
		private store: Store
	) {}
}
