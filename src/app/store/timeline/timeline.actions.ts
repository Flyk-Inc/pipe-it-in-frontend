import { createAction, props } from '@ngrx/store';
import { CreatePostDto, TimelinePost } from '../../models/post.model';

export const loadPosts = createAction('[Timeline] Load Posts');
export const loadPostsSuccess = createAction(
  '[Timeline] Load Posts Success',
  props<{ posts: TimelinePost[] }>()
);
export const loadPostsFailure = createAction(
  '[Timeline] Load Posts Failure',
  props<{ error: string }>()
);

export const createPost = createAction(
  '[Timeline] Create Post',
  props<{ createPostDTO: CreatePostDto }>()
);
export const createPostSuccess = createAction(
  '[Timeline] Create Post Success',
  props<{ post: TimelinePost }>()
);
export const createPostFailure = createAction(
  '[Timeline] Create Post Failure',
  props<{ error: string }>()
);
