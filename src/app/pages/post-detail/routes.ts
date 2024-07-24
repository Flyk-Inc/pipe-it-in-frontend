import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { postReducer } from '../../store/post/post.reducers';
import { PostEffects } from '../../store/post/post.effects';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./post-detail.component').then(m => m.PostDetailComponent),
		canActivate: [AuthGuard],
		providers: [
			provideState({ name: 'post', reducer: postReducer }),
			provideEffects(PostEffects),
		],
	},
	{
		path: '',
		redirectTo: '',
		pathMatch: 'full',
	},
];
