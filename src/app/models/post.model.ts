import { Version } from './code.model';

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
	comments: number;
	likes: number;
	version?: Version;
}

export interface CreatePostDto {
	text: string;
	groupId?: number;
	versionId?: number;
}
