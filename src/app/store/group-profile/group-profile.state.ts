import { Group } from '../../models/group.model';
import { TimelinePost } from '../../models/post.model';

export interface GroupProfileState {
	group: Group | null;
	posts: TimelinePost[];
	loading: boolean;
	error: string | null;
}

export const initialState: GroupProfileState = {
	group: null,
	posts: [],
	error: null,
	loading: false,
};
