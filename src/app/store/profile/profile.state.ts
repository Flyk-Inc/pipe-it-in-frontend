import { UserDTO } from '../../auth/DTO/user.dto';
import { TimelinePost } from '../../models/post.model';
import { Group } from '../../models/group.model';

export interface ProfileState {
	user: UserDTO | null;
	posts: TimelinePost[];
	groups: Group[];
	profilePictureUrl: string;
	error: string | null;
}

export const initialState: ProfileState = {
	user: null,
	posts: [],
	groups: [],
	profilePictureUrl:
		'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
	error: null,
};
