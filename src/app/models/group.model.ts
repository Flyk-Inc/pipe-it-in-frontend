export interface Group {
	id: number;
	name: string;
	description?: string;
	isPrivate: boolean;
	profilePicture?: number;
	pinnedPost?: number;
	creatorId: number;
	creator: {
		id: number;
		firstName: string;
		lastName: string;
	};
	members: GroupMember[];
	memberCount: number;
	createdAt: Date;
	updatedAt: Date;
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
