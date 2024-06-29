import { UserDTO } from '../../auth/DTO/user.dto';
import { TimelinePost } from '../../models/post.model';
import { Group } from '../../models/group.model';

export interface ProfileState {
	user: UserDTO | null;
	posts: TimelinePost[];
	groups: Group[];
	error: string | null;
}

export const initialState: ProfileState = {
	user: null,
	posts: [],
	groups: [],
	error: null,
};
