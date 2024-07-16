import { Component, Input } from '@angular/core';
import { TestRun } from '../../../models/code.model';
import { CodeReportComponent } from '../code-report/code-report.component';

@Component({
	selector: 'app-code-report-history',
	standalone: true,
	imports: [CodeReportComponent],
	templateUrl: './code-report-history.component.html',
})
export class CodeReportHistoryComponent {
	@Input() testRuns!: TestRun[];
}
