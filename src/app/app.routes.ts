import { Routes } from '@angular/router';

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
		path: 'pipelines',
		loadChildren: () => import('./pages/pipelines/routes').then(m => m.routes),
	},
	{
		path: 'code',
		loadChildren: () => import('./pages/code-home/routes').then(m => m.routes),
	},
	{
		path: 'profile',
		loadChildren: () => import('./pages/profile/routes').then(m => m.routes),
	},
	{
		path: 'profile/:userId',
		loadChildren: () =>
			import('./pages/user-profile/routes').then(m => m.routes),
	},
	{
		path: '**',
		redirectTo: 'home',
	},
];
