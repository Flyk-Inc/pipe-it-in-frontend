import { PostComment, TimelinePost } from '../../models/post.model';

export interface PostState {
	currentUserId: number | null;
	selectedPost: TimelinePost | null;
	comments: PostComment[];
	error: string | null;
}

export const initialState: PostState = {
	currentUserId: null,
	selectedPost: null,
	comments: [],
	error: null,
};
