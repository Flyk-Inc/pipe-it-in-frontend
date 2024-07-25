import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { GroupEffects } from '../../store/group/group.effects';
import { groupReducer } from '../../store/group/group.reducers';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./groups.component').then(m => m.GroupsComponent),
		canActivate: [AuthGuard],
		providers: [
			provideState({ name: 'group', reducer: groupReducer }),
			provideEffects(GroupEffects),
		],
	},
	{
		path: '',
		redirectTo: '',
		pathMatch: 'full',
	},
];
