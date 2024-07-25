import { Group } from '../../models/group.model';

export interface GroupState {
	groups: Group[];
	error: string | null;
}

export const initialState: GroupState = {
	groups: [],
	error: null,
};
