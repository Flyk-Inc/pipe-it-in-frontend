import { PostComment, TimelinePost } from '../../models/post.model';

export interface PostState {
	selectedPost: TimelinePost | null;
	comments: PostComment[];
	error: string | null;
}

export const initialState: PostState = {
	selectedPost: null,
	comments: [],
	error: null,
};
