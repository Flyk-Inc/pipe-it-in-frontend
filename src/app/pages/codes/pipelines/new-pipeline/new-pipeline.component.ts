import { Component } from '@angular/core';
import {
	FormBuilder,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AsyncPipe } from '@angular/common';
import { VersionSelectorComponent } from '../../../../component/code/version-selector/version-selector.component';
import { PipelineStepsCreatorComponent } from '../../../../component/code/pipeline-steps-creator/pipeline-steps-creator.component';
import { ButtonComponent } from '../../../../component/layout/button/button.component';
import { Version } from '../../../../models/code.model';
import { PipelineService } from '../../../../service/pipeline.service';
import { CreatePipelineDTO } from '../../../../models/pipeline.model';
import { codeRoutePath } from '../../routes';
import { Router } from '@angular/router';
import { CodePipelineRoutes, pipelineRoutePath } from '../routes';

@Component({
	selector: 'app-new-pipeline',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		NgSelectModule,
		AsyncPipe,
		FormsModule,
		VersionSelectorComponent,
		PipelineStepsCreatorComponent,
		ButtonComponent,
	],
	templateUrl: './new-pipeline.component.html',
})
export class NewPipelineComponent {
	createPipelineForm = this.formBuilder.nonNullable.group({
		title: ['', Validators.required],
		description: ['', Validators.required],
		pipelineCodes: [<Version[]>[], Validators.required],
	});
	stepsValidity = false;

	createPipelineText = $localize`:@@pipeline.create:Create Pipeline`;

	constructor(
		private formBuilder: FormBuilder,
		private pipelineService: PipelineService,
		private router: Router
	) {}

	createPipeline() {
		const dto = this.createDto();
		this.pipelineService.createPipeline(dto).subscribe({
			next: pipeline => {
				this.router
					.navigate([
						`/${codeRoutePath}/${pipelineRoutePath}/${CodePipelineRoutes.Page}/${pipeline.id}`,
					])
					.then();
			},
		});
	}

	handleStepsCHange($event: Version[]) {
		console.log($event);
		this.createPipelineForm.controls.pipelineCodes.setValue($event);
	}

	handleStepsValidityChange($event: boolean) {
		this.stepsValidity = $event;
	}

	createDto(): CreatePipelineDTO {
		return {
			title: this.createPipelineForm.controls.title.value,
			description: this.createPipelineForm.controls.description.value,
			pipelineCodes: this.createPipelineForm.controls.pipelineCodes.value.map(
				(version, index) => {
					return {
						code_version_id: version.id,
						step: index,
					};
				}
			),
		};
	}
}
