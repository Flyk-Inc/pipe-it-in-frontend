import { Routes } from '@angular/router';
import { CodeRoutes } from '../routes';

export enum CodePipelineRoutes {
	Page = 'page',
	New = 'new',
}
export const pipelineRoutePath = 'pipelines';

export const routes: Routes = [
	{
		path: CodeRoutes.Page + '/:id',
		loadComponent: () =>
			import('./pipeline-page/pipeline-page.component').then(
				m => m.PipelinePageComponent
			),
	},
];
