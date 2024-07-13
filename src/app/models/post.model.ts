export interface TimelinePost {
	id: number;
	text: string;
	createdAt: Date;
	updatedAt: Date;
	user: { firstName: string; lastName: string; id: number; username: string };
	comments: number;
	likes: number;
}

export interface CreatePostDto {
	text: string;
	groupId?: number;
}
