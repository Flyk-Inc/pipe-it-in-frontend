import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { profileReducers } from '../../store/profile/profile.reducers';
import { ProfileEffects } from '../../store/profile/profile.effects';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./profile.component').then(m => m.ProfileComponent),
		canActivate: [AuthGuard],
		providers: [
			provideState({ name: 'profile', reducer: profileReducers }),
			provideEffects(ProfileEffects),
		],
	},
	{
		path: '',
		redirectTo: 'profile',
		pathMatch: 'full',
	},
];
