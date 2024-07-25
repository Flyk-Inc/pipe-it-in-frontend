import { createAction, props } from '@ngrx/store';
import { CreateGroupDTO, Group } from '../../models/group.model';

export const loadGroups = createAction('[Group] Load Groups');
export const loadGroupsSuccess = createAction(
	'[Group] Load Groups Success',
	props<{ groups: Group[] }>()
);
export const loadGroupsFailure = createAction(
	'[Group] Load Groups Failure',
	props<{ error: string }>()
);

export const createGroup = createAction(
	'[Group] Create Group',
	props<{ group: CreateGroupDTO }>()
);
export const createGroupSuccess = createAction(
	'[Group] Create Group Success',
	props<{ group: Group }>()
);
export const createGroupFailure = createAction(
	'[Group] Create Group Failure',
	props<{ error: string }>()
);
