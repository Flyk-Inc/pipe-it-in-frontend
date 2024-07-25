import { UserDTO } from '../auth/DTO/user.dto';

export interface Group {
	id: number;
	name: string;
	description?: string;
	isPrivate: boolean;
	profilePicture?: {
		id: string;
	};
	pinnedPost?: number;
	creatorId: number;
	creator: {
		id: number;
		firstName: string;
		lastName: string;
	};
	members: GroupMember[];
	memberCount: number;
	postCount: number;
	receivedGroupRequests: GroupRequest[];
	createdAt: Date;
	updatedAt: Date;
}

export interface GroupRequest {
	requester: UserDTO;
	group: Group;
	isAccepted: boolean;
}

export interface CreateGroupDTO {
	name: string;
	description?: string;
	isPrivate?: boolean;
}

export interface GroupMember {
	id: number;
	userId: number;
	groupId: number;
	user: {
		id: number;
		firstName: string;
		lastName: string;
	};
	isAdmin: boolean;
	isBanned: boolean;
	joinedAt: Date;
}
