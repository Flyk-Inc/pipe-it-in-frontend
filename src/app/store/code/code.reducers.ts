import { createReducer, on } from '@ngrx/store';
import { CodeTimelineState, initialState } from './code.state';
import * as CodeTimelineActions from './code.actions';

export const codeTimelineReducer = createReducer(
	initialState,
	on(
		CodeTimelineActions.loadPersonalCodes,
		(state): CodeTimelineState => ({
			...state,
			loading: true,
			error: null,
		})
	),
	on(
		CodeTimelineActions.loadCodesSuccess,
		(state, { codes }): CodeTimelineState => {
			console.log(codes);
			return {
				...state,
				personalCodes: codes,
				loading: false,
			};
		}
	),
	on(
		CodeTimelineActions.loadCodesFailure,
		(state, { error }): CodeTimelineState => ({
			...state,
			loading: false,
			error,
		})
	),
	on(
		CodeTimelineActions.createCode,
		(state): CodeTimelineState => ({
			...state,
			loading: true,
			error: null,
		})
	),
	on(
		CodeTimelineActions.createCodeSuccess,
		(state, { code }): CodeTimelineState => ({
			...state,
			personalCodes: [code, ...state.personalCodes],
			loading: false,
		})
	),
	on(
		CodeTimelineActions.createCodeFailure,
		(state, { error }): CodeTimelineState => ({
			...state,
			loading: false,
			error,
		})
	)
);
