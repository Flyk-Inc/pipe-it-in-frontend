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
		path: 'codes',
		loadChildren: () => import('./pages/codes/routes').then(m => m.routes),
	},
	{
		path: 'profile',
		loadChildren: () => import('./pages/profile/routes').then(m => m.routes),
	},
  {
    path:'page-not-found',
    loadComponent: () => import('./pagenotfound/pagenotfound.component').then(m => m.PagenotfoundComponent),
  },
	{
		path: '**',
		redirectTo: 'home',
	},
];
