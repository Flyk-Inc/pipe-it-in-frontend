import { Component, Input, OnInit } from '@angular/core';
import { Run } from '../../../../models/pipeline.model';
import { CodeReportComponent } from '../../report-history/code-report/code-report.component';
import { DatePipe } from '@angular/common';
import { RunReportStepComponent } from '../run-report-step/run-report-step.component';

@Component({
	selector: 'app-run-history',
	standalone: true,
	imports: [CodeReportComponent, DatePipe, RunReportStepComponent],
	templateUrl: './run-history.component.html',
})
export class RunHistoryComponent implements OnInit {
	@Input() runs!: Run[];

	ngOnInit() {
		this.runs.sort((a, b) => {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		});
	}
}
