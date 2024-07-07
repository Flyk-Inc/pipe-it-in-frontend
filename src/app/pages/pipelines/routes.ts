import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { codeTimelineReducer } from '../../store/code/code.reducers';
import { CodeTimelineEffects } from '../../store/code/code.effects';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./pipelines.component').then(m => m.PipelinesComponent),
		canActivate: [AuthGuard],
		providers: [
			provideState({ name: 'codeTimeline', reducer: codeTimelineReducer }),
			provideEffects(CodeTimelineEffects),
		],
	},
	{
		path: '',
		redirectTo: '',
		pathMatch: 'full',
	},
];
