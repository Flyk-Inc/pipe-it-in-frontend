import { UserDTO } from '../../auth/DTO/user.dto';
import { TimelinePost } from '../../models/post.model';
import { Group } from '../../models/group.model';

export interface UserProfileState {
	user: UserDTO | null;
	userGroups: Group[];
	userPosts: TimelinePost[];
	pinnedPost: number | null;
	profilePictureUrl: string;
	error: string | null;
}
export const initialState: UserProfileState = {
	user: null,
	userGroups: [],
	userPosts: [],
	pinnedPost: null,
  profilePictureUrl:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
  error: null,
};
