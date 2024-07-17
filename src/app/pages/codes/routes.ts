import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { codeTimelineReducer } from '../../store/code/code.reducers';
import { CodeTimelineEffects } from '../../store/code/code.effects';
import { BasicLayoutComponent } from '../../component/layout/basic-layout/basic-layout.component';

export enum CodeRoutes {
	PersonalCodes = 'personal-codes',
	PersonalPipelines = 'personal-pipelines',
	New = 'new',
	Page = 'page',
}
export const codeRoutePath = 'codes';

export const routes: Routes = [
	{
		path: '',
		component: BasicLayoutComponent,
		data: { routerOutlet: true }, // Define the data to be passed here
		children: [
      {
        path: CodeRoutes.PersonalCodes,
        loadComponent: () =>
          import('./code-home.component').then(m => m.CodeHomeComponent),
        canActivate: [AuthGuard],
        providers: [
          provideState({ name: 'codeTimeline', reducer: codeTimelineReducer }),
          provideEffects(CodeTimelineEffects),
        ],
      },
      {
        path: CodeRoutes.PersonalPipelines,
        loadComponent: () =>
          import('./code-home.component').then(m => m.CodeHomeComponent),
        canActivate: [AuthGuard],
        providers: [
          provideState({ name: 'codeTimeline', reducer: codeTimelineReducer }),
          provideEffects(CodeTimelineEffects),
        ],
      },
      {
				path: CodeRoutes.New,
				loadComponent: () =>
					import('./code/new-code/new-code.component').then(
						m => m.NewCodeComponent
					),
			},
			{
				path: CodeRoutes.Page + '/:id',
				loadComponent: () =>
					import('./code/code-page/code-page.component').then(
						m => m.CodePageComponent
					),
			},
      {
        path: '',
        redirectTo: CodeRoutes.PersonalCodes,
        pathMatch: 'full',
      },
    ],
	},
];
