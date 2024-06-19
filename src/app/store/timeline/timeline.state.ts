import { TimelinePost } from '../../models/post.model';

export interface TimelineState {
	posts: TimelinePost[];
	loading: boolean;
	error: string | null;
}

export const initialState: TimelineState = {
	posts: [],
	loading: false,
	error: null,
};
