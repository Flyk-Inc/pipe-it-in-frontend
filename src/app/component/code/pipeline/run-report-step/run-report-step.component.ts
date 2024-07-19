import { Component, Input } from '@angular/core';
import { PipelineStep } from '../../../../models/code.model';
import { DatePipe } from '@angular/common';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { Highlight, HighlightAuto } from 'ngx-highlightjs';
import { environment } from '../../../../../environments/environment';

@Component({
	selector: 'app-run-report-step',
	standalone: true,
	imports: [DatePipe, HighlightLineNumbers, Highlight, HighlightAuto],
	templateUrl: './run-report-step.component.html',
})
export class RunReportStepComponent {
	@Input() testRun!: PipelineStep;
	protected readonly environment = environment;
}
