import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { provideState } from '@ngrx/store';
import { profileReducers } from '../../store/profile/profile.reducers';
import { provideEffects } from '@ngrx/effects';
import { ProfileEffects } from '../../store/profile/profile.effects';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./followers.component').then(m => m.FollowersComponent),
		canActivate: [AuthGuard],
		providers: [
			provideState({ name: 'profile', reducer: profileReducers }),
			provideEffects(ProfileEffects),
		],
	},
	{
		path: '',
		redirectTo: '',
		pathMatch: 'full',
	},
];
