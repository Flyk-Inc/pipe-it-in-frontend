import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { groupProfileReducer } from '../../../store/group-profile/group-profile.reducers';
import { GroupProfileEffects } from '../../../store/group-profile/group-profile.effects';
import { AuthGuard } from '../../../auth/auth.guard';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./group-profile.component').then(m => m.GroupProfileComponent),
		canActivate: [AuthGuard],
		providers: [
			provideState({ name: 'groupProfile', reducer: groupProfileReducer }),
			provideEffects(GroupProfileEffects),
		],
	},
	{
		path: '',
		redirectTo: 'groups',
		pathMatch: 'full',
	},
];
