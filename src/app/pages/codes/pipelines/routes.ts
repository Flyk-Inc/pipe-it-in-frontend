import { Routes } from '@angular/router';

export enum CodePipelineRoutes {
	Page = 'page',
	New = 'new',
}
export const pipelineRoutePath = 'pipelines';

export const routes: Routes = [
	{
		path: CodePipelineRoutes.Page + '/:id',
		loadComponent: () =>
			import('./pipeline-page/pipeline-page.component').then(
				m => m.PipelinePageComponent
			),
	},
	{
		path: CodePipelineRoutes.New,
		loadComponent: () =>
			import('./new-pipeline/new-pipeline.component').then(
				m => m.NewPipelineComponent
			),
	},
];
