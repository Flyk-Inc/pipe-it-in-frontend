import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TimelinePipeline } from '../../../../models/pipeline.model';
import { PipelineService } from '../../../../service/pipeline.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { PipelineStepComponent } from '../pipeline-step/pipeline-step.component';
import { IconComponent } from '../../../../component/typography/icon/icon.component';
import { ButtonComponent } from '../../../../component/layout/button/button.component';
import { NotificationService } from '../../../../service/notification.service';
import { CodeReportHistoryComponent } from '../../../../component/code/report-history/code-report-history.component';
import { RunHistoryComponent } from '../../../../component/code/pipeline/run-history/run-history.component';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-pipeline-page',
	standalone: true,
	imports: [
		NgOptimizedImage,
		RouterLink,
		PipelineStepComponent,
		IconComponent,
		ButtonComponent,
		CodeReportHistoryComponent,
		RunHistoryComponent,
	],
	templateUrl: './pipeline-page.component.html',
})
export class PipelinePageComponent implements OnInit {
	@ViewChild('runHistoryElement')
	runHistoryElementRef!: ElementRef;

	pipelineId!: number;
	pipeline?: TimelinePipeline;
	fileInput = new FormControl<File | null>(null);

	constructor(
		private pipelineService: PipelineService,
		private route: ActivatedRoute,
		private notificationService: NotificationService
	) {}

	ngOnInit() {
		this.loadPipeline();
		this.setupPeriodicRunRefresh();
	}

	loadPipeline() {
		this.pipelineId = Number(this.route.snapshot.params['id']);
		this.pipelineService
			.getPipelineById(this.pipelineId)
			.subscribe((pipeline: TimelinePipeline) => {
				if (
					this.pipeline &&
					pipeline.runs.length !== this.pipeline?.pipelineCodes.length
				) {
					this.notifyNewRunArrived();
				}
				this.pipeline = pipeline;
			});
	}

	runPipeline() {
		console.log(this.fileInput.value);
		this.pipelineService
			.runPipeline(this.pipelineId, this.fileInput.value ?? undefined)
			.subscribe({
				next: () => {
					this.notificationService.showSuccessToast('Pipeline is running');
					this.resetFileInput();
				},
				error: error => {
					this.notificationService.showErrorToast(error);
				},
			});
	}

	handleFileInputChange($event: Event) {
		const target = $event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file && this.pipeline) {
			const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
			const validFileType = this.pipeline.pipelineCodes[0].version.input.length
				? this.pipeline.pipelineCodes[0].version.input[0].fileType === 'png'
					? 'image/png'
					: 'text/plain'
				: '';

			if (file.size > maxSizeInBytes) {
				this.notificationService.showErrorToast(
					$localize`:@@file.size.exceeded:The file size exceeds the maximum allowed size of 2MB`
				);
				this.fileInput.setValue(null);
				return;
			}

			if (file.type !== validFileType) {
				this.notificationService.showErrorToast(
					$localize`:@@file.type.invalid:The file type is not valid. Only ${
						validFileType === 'image/png' ? 'PNG' : 'TXT'
					} files are allowed.`
				);
				this.fileInput.setValue(null);
				return;
			}

			this.fileInput.setValue(file);
		}
	}

	private notifyNewRunArrived() {
		this.notificationService.showSuccessToast(
			$localize`:@@pipeline.run.new:new pipeline run results arrived.`
		);
		this.scrollToTestHistory();
	}

	private scrollToTestHistory() {
		const latestRunElement = document.getElementById('latest_run');
		if (latestRunElement) {
			latestRunElement.scrollIntoView({
				behavior: 'smooth',
			});
			return;
		}
		this.runHistoryElementRef.nativeElement.scrollIntoView({
			behavior: 'smooth',
		});
	}

	private resetFileInput() {
		this.fileInput.setValue(null);
		const inputElement = document.getElementById(
			'file_input'
		) as HTMLInputElement;
		if (inputElement) {
			inputElement.value = '';
		}
	}

	private setupPeriodicRunRefresh() {
		setInterval(() => {
			this.loadPipeline();
		}, 10000);
	}
}
