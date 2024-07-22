import { Component, Input } from '@angular/core';
import { PipelineCode } from '../../../../models/pipeline.model';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-pipeline-step',
	standalone: true,
	imports: [DatePipe],
	templateUrl: './pipeline-step.component.html',
	styleUrl: './pipeline-step.component.scss',
})
export class PipelineStepComponent {
	@Input() step!: PipelineCode;
}
