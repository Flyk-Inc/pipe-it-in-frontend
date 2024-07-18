import { Component, Input } from '@angular/core';
import { IconComponent } from '../../../component/typography/icon/icon.component';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { codeRoutePath } from '../routes';
import { CodePipelineRoutes, pipelineRoutePath } from '../pipelines/routes';
import { TimelinePipeline } from '../../../models/pipeline.model';
import { RouterLink } from '@angular/router';
import { fileUrl } from '../../../models/utils';

@Component({
	selector: 'app-personal-pipelines-item',
	standalone: true,
	imports: [IconComponent, NgIf, RouterLink, NgOptimizedImage],
	templateUrl: './personal-pipelines-item.component.html',
})
export class PersonalPipelinesItemComponent {
	@Input() pipeline!: TimelinePipeline;

	protected readonly codeRoutePath = codeRoutePath;
	protected readonly pipelineRoutePath = pipelineRoutePath;
	protected readonly CodePipelineRoutes = CodePipelineRoutes;
  protected readonly fileUrl = fileUrl;
}
