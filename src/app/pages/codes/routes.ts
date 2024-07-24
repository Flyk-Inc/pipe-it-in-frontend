import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { codeTimelineReducer } from '../../store/code/code.reducers';
import { CodeTimelineEffects } from '../../store/code/code.effects';
import { BasicLayoutComponent } from '../../component/layout/basic-layout/basic-layout.component';
import { pipelineTimelineReducer } from '../../store/pipeline/pipeline.reducers';
import { PipelineTimelineEffects } from '../../store/pipeline/pipeline.effects';

export enum CodeRoutes {
	Codes = 'list',
	Pipelines = 'pipelines',
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
				path: '',
				loadComponent: () =>
					import('./code-home.component').then(m => m.CodeHomeComponent),
				children: [
					{
						path: CodeRoutes.Codes,
						loadComponent: () =>
							import(
								'./personal-codes-list/personal-codes-list.component'
							).then(m => m.PersonalCodesListComponent),
						canActivate: [AuthGuard],
						providers: [
							provideState({
								name: 'codeTimeline',
								reducer: codeTimelineReducer,
							}),
							provideEffects(CodeTimelineEffects),
						],
					},
					{
						path: CodeRoutes.Pipelines,
						loadComponent: () =>
							import(
								'././pipelines/personal-pipelines-list/personal-pipelines-list.component'
							).then(m => m.PersonalPipelinesListComponent),
						canActivate: [AuthGuard],
						providers: [
							provideState({
								name: 'pipelineTimeline',
								reducer: pipelineTimelineReducer,
							}),
							provideEffects(PipelineTimelineEffects),
						],
					},
					{
						path: '',
						redirectTo: CodeRoutes.Codes,
						pathMatch: 'full',
					},
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
				path: 'pipelines',
				loadChildren: () => import('./pipelines/routes').then(m => m.routes),
			},
			{
				path: '',
				redirectTo: CodeRoutes.Codes,
				pathMatch: 'full',
			},
		],
	},
];
