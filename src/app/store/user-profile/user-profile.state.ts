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
  profilePictureUrl: '',
  error: null,
};
