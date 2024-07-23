export interface TimelinePost {
	id: number;
	text: string;
	createdAt: Date;
	updatedAt: Date;
	user: {
		firstName: string;
		lastName: string;
		id: number;
		username: string;
		profilePicture?: { id: string };
	};
	comments: PostComment[];
	likes: number;
}

export interface CreatePostDto {
	text: string;
	groupId?: number;
}

export interface PostComment {
	id: number;
	user: {
		firstName: string;
		lastName: string;
		id: number;
		username: string;
		profilePicture?: { id: string };
	};
	parent: PostComment;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	replies: PostComment[];
	reactions: Reaction[];
}

export interface Reaction {
	user: {
		id: number;
	};
	isLike: boolean;
	createdAt: Date;
}
