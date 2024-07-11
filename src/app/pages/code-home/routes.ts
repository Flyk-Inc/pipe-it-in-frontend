import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./code-home.component').then(m => m.CodeHomeComponent),
		canActivate: [AuthGuard],
		children: [
			{
				path: 'new',
				loadComponent: () =>
					import('././new-code/new-code.component').then(
						m => m.NewCodeComponent
					),
			},
			{
				path: ':id',
				loadComponent: () =>
					import('./code-page/code-page.component').then(
						m => m.CodePageComponent
					),
			},
		],
	},
	{
		path: '',
		redirectTo: '',
		pathMatch: 'full',
	},
];
