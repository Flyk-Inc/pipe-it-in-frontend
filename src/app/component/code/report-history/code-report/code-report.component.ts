import { Component, Input } from '@angular/core';
import { TestRun } from '../../../../models/code.model';
import { DatePipe } from '@angular/common';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { Highlight, HighlightAuto } from 'ngx-highlightjs';
import { environment } from '../../../../../environments/environment';

@Component({
	selector: 'app-code-report',
	standalone: true,
	imports: [DatePipe, HighlightLineNumbers, HighlightAuto, Highlight],
	templateUrl: './code-report.component.html',
})
export class CodeReportComponent {
	@Input() testRun!: TestRun;
	@Input() openByDefault: boolean = false;
	protected readonly environment = environment;
}
