import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CodeTimelineActions from './code.actions';
import { CodeService } from '../../service/code.service';
import { Store } from '@ngrx/store';

@Injectable()
export class CodeTimelineEffects {
	loadUserCodes$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(CodeTimelineActions.loadPersonalCodes),
			mergeMap(() =>
				this.codeService.getTimeLineCodes(true).pipe(
					map(codes => {
						return CodeTimelineActions.loadCodesSuccess({ codes });
					}),
					catchError(error =>
						of(CodeTimelineActions.loadCodesFailure({ error: error.message }))
					)
				)
			)
		);
	});
	loadAllUserRelatedCodes$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(CodeTimelineActions.loadAllTimelineCodes),
			mergeMap(() =>
				this.codeService.getTimeLineCodes(false).pipe(
					map(codes => {
						return CodeTimelineActions.loadCodesSuccess({ codes });
					}),
					catchError(error =>
						of(CodeTimelineActions.loadCodesFailure({ error: error.message }))
					)
				)
			)
		);
	});
	createCode$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(CodeTimelineActions.createCode),
			mergeMap(({ createCodeDTO }) =>
				this.codeService.createCode(createCodeDTO).pipe(
					map(code => {
						return CodeTimelineActions.createCodeSuccess({ code });
					}),
					catchError(error =>
						of(CodeTimelineActions.createCodeFailure({ error: error.message }))
					)
				)
			)
		);
	});

	constructor(
		private actions$: Actions,
		private codeService: CodeService,
		private store: Store
	) {}
}
