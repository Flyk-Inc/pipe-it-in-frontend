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
	following: UserFollows[];
	followers: UserFollows[];
	pinnedPost: number | null;
	isPrivate: boolean;
	sentFollowRequests: FollowRequest[];
	receivedFollowRequests: FollowRequest[];
}

export interface UserFollows {
	follower: UserDTO;
	user: UserDTO;
}

export interface FollowRequest {
	id: number;
	follower: UserDTO;
	user: UserDTO;
	isAccepted: boolean;
}
