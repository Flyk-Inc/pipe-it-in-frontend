import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./search-home.component').then(m => m.SearchHomeComponent),
		canActivate: [AuthGuard],
	},
	{
		path: '**',
		redirectTo: 'home',
		pathMatch: 'full',
	},
];
