import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./home.component').then(m => m.HomeComponent),
		canActivate: [AuthGuard],
	},
	{
		path: '',
		redirectTo: '',
		pathMatch: 'full',
	},
];
