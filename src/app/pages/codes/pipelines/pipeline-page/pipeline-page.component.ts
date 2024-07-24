import {
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import { TimelinePipeline } from '../../../../models/pipeline.model';
import { PipelineService } from '../../../../service/pipeline.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { PipelineStepComponent } from '../pipeline-step/pipeline-step.component';
import { IconComponent } from '../../../../component/typography/icon/icon.component';
import { ButtonComponent } from '../../../../component/layout/button/button.component';
import { NotificationService } from '../../../../service/notification.service';
import { CodeReportHistoryComponent } from '../../../../component/code/report-history/code-report-history.component';
import { RunHistoryComponent } from '../../../../component/code/pipeline/run-history/run-history.component';
import {
	FormBuilder,
	FormControl,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { PipelineStepsCreatorComponent } from '../../../../component/code/pipeline-steps-creator/pipeline-steps-creator.component';
import { CodeStatus, Version } from '../../../../models/code.model';

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
		PipelineStepsCreatorComponent,
		FormsModule,
		ReactiveFormsModule,
		NgClass,
	],
	templateUrl: './pipeline-page.component.html',
})
export class PipelinePageComponent implements OnInit, OnDestroy {
	@ViewChild('runHistoryElement')
	runHistoryElementRef!: ElementRef;

	mode: 'view' | 'edit' = 'view';
	pipelineId!: number;
	pipeline?: TimelinePipeline;
	fileInput = new FormControl<File | null>(null);
	confirmString = $localize`:@@confirm:Confirm`;
	modifyString = $localize`:@@modify:Modify`;
	cancelString = $localize`:@@cancel:Cancel`;

	createPipelineForm = this.formBuilder.nonNullable.group({
		title: ['', Validators.required],
		description: ['', Validators.required],
		pipelineCodes: [<Version[]>[], Validators.required],
	});
	stepsValidity = false;

	private intervalSubscription!: Subscription;

	constructor(
		private pipelineService: PipelineService,
		private route: ActivatedRoute,
		private router: Router,
		private notificationService: NotificationService,
		private formBuilder: FormBuilder
	) {}

	ngOnInit() {
		this.loadPipeline();
		this.setupPeriodicRunRefresh();
	}

	ngOnDestroy() {
		if (this.intervalSubscription) {
			this.intervalSubscription.unsubscribe();
		}
	}

	loadPipeline() {
		this.pipelineId = Number(this.route.snapshot.params['id']);
		this.pipelineService.getPipelineById(this.pipelineId).subscribe({
			next: (pipeline: TimelinePipeline) => {
				if (
					this.pipeline &&
					pipeline.runs.length !== this.pipeline.runs.length
				) {
					this.setPipeline(pipeline);

					this.notifyNewRunArrived();
					return;
				}
				this.setPipeline(pipeline);
			},
			error: () => {
				this.router.navigate(['/404']).then();
			},
		});
	}

	runPipeline() {
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

	setPipeline(pipeline: TimelinePipeline) {
		this.pipeline = pipeline;
		this.fillForm(pipeline);
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
		this.intervalSubscription = interval(10000).subscribe(() => {
			this.loadPipeline();
		});
	}

	protected pipelineCodesToVersions() {
		return this.pipeline?.pipelineCodes.map(pipelineCode => {
			return pipelineCode.version;
		});
	}

	fillForm(pipeline: TimelinePipeline) {
		this.createPipelineForm.controls.title.setValue(pipeline.title);
		this.createPipelineForm.controls.description.setValue(pipeline.description);
		this.createPipelineForm.controls.pipelineCodes.setValue(
			this.pipelineCodesToVersions() ?? []
		);
	}

	handleStepsCHange($event: Version[]) {
		this.createPipelineForm.controls.pipelineCodes.setValue($event);
	}

	handleStepsValidityChange($event: boolean) {
		this.stepsValidity = $event;
	}

	updatePipeline() {
		const dto = this.createDto();
		this.pipelineService.updatePipeline(dto, this.pipeline!.id).subscribe({
			next: pipeline => {
				this.setPipeline(pipeline);
				this.switchMode('view');
			},
		});
	}

	private createDto() {
		return {
			title: this.createPipelineForm.controls.title.value,
			description: this.createPipelineForm.controls.description.value,
			pipelineCodes: this.createPipelineForm.controls.pipelineCodes.value.map(
				(version, index) => {
					return {
						code_version_id: version.id,
						step: index + 1,
					};
				}
			),
		};
	}

	switchMode(to: 'view' | 'edit') {
		if (to === 'edit' && this.intervalSubscription) {
			this.intervalSubscription.unsubscribe();
		} else if (to === 'view') {
			this.setupPeriodicRunRefresh();
		}
		this.mode = to;
	}

	swapVisibility() {
		const currentStatus = this.pipeline!.status;
		const newStatus =
			currentStatus === CodeStatus.active
				? CodeStatus.hidden
				: CodeStatus.active;
		this.pipelineService
			.updatePipelineVisibility(this.pipeline!.id, newStatus)
			.subscribe({
				next: () => {
					this.notificationService.showSuccessToast(
						$localize`:@@pipeline.visibility.updated:Code visibility updated successfully.`
					);
					this.loadPipeline();
				},
			});
	}

	protected readonly CodeStatus = CodeStatus;
}
