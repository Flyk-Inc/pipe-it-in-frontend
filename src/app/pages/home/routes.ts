import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { provideState } from '@ngrx/store';
import { timelineReducer } from '../../store/timeline/timeline.reducers';
import { provideEffects } from '@ngrx/effects';
import { TimelineEffects } from '../../store/timeline/timeline.effects';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./home.component').then(m => m.HomeComponent),
		canActivate: [AuthGuard],
		providers: [
			provideState({ name: 'timeline', reducer: timelineReducer }),
			provideEffects(TimelineEffects),
		],
	},
	{
		path: '',
		redirectTo: '',
		pathMatch: 'full',
	},
];
