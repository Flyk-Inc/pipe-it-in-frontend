import { createAction, props } from '@ngrx/store';
import { CreateCodeDTO, TimelineCode } from '../../models/code.model';

export const loadPersonalCodes = createAction('[Code Timeline] Load Code');
export const loadCodesSuccess = createAction(
	'[Code Timeline] Load Codes Success',
	props<{ codes: TimelineCode[] }>()
);
export const loadCodesFailure = createAction(
	'[Code Timeline] Load Codes Failure',
	props<{ error: string }>()
);

export const createCode = createAction(
	'[Code Timeline] Create Code',
	props<{ createCodeDTO: CreateCodeDTO }>()
);
export const createCodeSuccess = createAction(
	'[Code Timeline] Create Code Success',
	props<{ code: TimelineCode }>()
);
export const createCodeFailure = createAction(
	'[Code Timeline] Create Code Failure',
	props<{ error: string }>()
);
