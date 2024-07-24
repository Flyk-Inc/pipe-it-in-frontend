import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

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
		loadChildren: () =>
			import('./pages/codes/pipelines/routes').then(m => m.routes),
	},
	{
		path: 'codes',
		loadChildren: () => import('./pages/codes/routes').then(m => m.routes),
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
		path: '404',
		canActivate: [AuthGuard],
		loadComponent: () =>
			import('./pagenotfound/pagenotfound.component').then(
				m => m.PagenotfoundComponent
			),
	},
	{
		path: 'followers',
		loadChildren: () => import('./pages/followers/routes').then(m => m.routes),
	},
	{
		path: '**',
		redirectTo: 'home',
	},
];
