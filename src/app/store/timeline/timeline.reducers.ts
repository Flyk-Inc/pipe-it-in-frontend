import { createReducer, on } from '@ngrx/store';
import * as TimelineActions from './timeline.actions';
import { initialState } from './timeline.state';

export const timelineReducer = createReducer(
  initialState,
  on(TimelineActions.loadPosts, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TimelineActions.loadPostsSuccess, (state, { posts }) => ({
    ...state,
    posts,
    loading: false
  })),
  on(TimelineActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(TimelineActions.createPost, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TimelineActions.createPostSuccess, (state, { post }) => ({
    ...state,
    posts: [post, ...state.posts],
    loading: false
  })),
  on(TimelineActions.createPostFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
