import { createAction, props } from '@ngrx/store';
import { Group } from '../../models/group.model';

export const loadGroups = createAction('[Group] Load Groups');
export const loadGroupsSuccess = createAction(
	'[Group] Load Groups Success',
	props<{ groups: Group[] }>()
);
export const loadGroupsFailure = createAction(
	'[Group] Load Groups Failure',
	props<{ error: string }>()
);
