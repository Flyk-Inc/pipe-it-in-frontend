import { TimelinePost } from '../../models/post.model';

export interface UserDTO {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	username: string;
	description?: string;
	profilePicture?: {
		id: string;
	};
	posts: TimelinePost[];
	following: UserDTO[];
	followers: UserDTO[];
	pinnedPost: number | null;
}
