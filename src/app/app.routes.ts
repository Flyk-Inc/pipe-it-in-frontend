import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./pages/auth/routes').then(m => m.routes),
	},
	{
		path: 'home',
		loadChildren: () => import('./pages/home/routes').then(m => m.routes),
	},
	{
		path: 'profile',
		component: ProfileComponent,
	},
	{
		path: '**',
		redirectTo: 'home',
	},
];
