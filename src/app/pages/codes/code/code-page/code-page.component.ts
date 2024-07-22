import {
	AfterViewChecked,
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { HighlightAuto } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { PanelModule } from 'primeng/panel';
import {
	FormBuilder,
	FormControl,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../component/layout/button/button.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { CreateCodeFormComponent } from './create-code-form/create-code-form.component';
import { CodeReportComponent } from '../../../../component/code/report-history/code-report/code-report.component';
import { CodeReportHistoryComponent } from '../../../../component/code/report-history/code-report-history.component';
import {
	CodeDetail,
	CodeLanguages,
	RunTestCodeDTO,
	TestRun,
} from '../../../../models/code.model';
import { CodeService } from '../../../../service/code.service';
import { NotificationService } from '../../../../service/notification.service';

@Component({
	selector: 'app-code-home-page',
	standalone: true,
	imports: [
		NgOptimizedImage,
		RouterLink,
		HighlightAuto,
		HighlightLineNumbers,
		PanelModule,
		DatePipe,
		ButtonComponent,
		ReactiveFormsModule,
		MonacoEditorModule,
		CreateCodeFormComponent,
		CodeReportComponent,
		CodeReportHistoryComponent,
	],
	templateUrl: './code-page.component.html',
	styleUrl: './code-page.component.scss',
})
export class CodePageComponent implements OnInit, AfterViewChecked {
	@ViewChild('testHistoryElement')
	testHistoryElementRef!: ElementRef;

	code?: CodeDetail;
	loading = true;
	error = false;
	testRuns: TestRun[] = [];

	hasInput = new FormControl(false);
	hasOutput = new FormControl(false);
	fileInput = new FormControl<File | null>(null);

	updateCodeForm = this.formBuilder.nonNullable.group({
		title: ['', Validators.required],
		description: ['', Validators.required],
		code: ['', Validators.required],
		language: [CodeLanguages.javascript, Validators.required],
		inputFileType: [''],
		outputFileType: [''],
		inputDescription: [''],
		outputDescription: [''],
	});

	editorOptions = {
		theme: 'vs-dark',
		language: this.updateCodeForm.controls.language.value,
	};

	mode: 'editing' | 'viewing' = 'viewing';
	saveStringTranslated = 'save';
	postStringTranslated = 'post';
	cancelStringTranslated = 'cancel';
	editStringTranslated = 'edit';

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private codeService: CodeService,
		private formBuilder: FormBuilder,
		private changeDetectorRef: ChangeDetectorRef,
		private notificationService: NotificationService
	) {}

	ngOnInit() {
		this.saveStringTranslated = $localize`:@@save.draft:save draft`;
		this.postStringTranslated = $localize`:@@post:post`;
		this.cancelStringTranslated = $localize`:@@cancel:cancel`;
		this.editStringTranslated = $localize`:@@edit:edit`;
		this.loadCode();
		this.setupPeriodicTestRunRefresh();
	}

	loadCode() {
		const codeId = Number(this.route.snapshot.params['id']);
		this.codeService.getCodeDetailById(codeId).subscribe({
			next: receivedCode => {
				this.setCode(receivedCode);
				this.loading = false;
			},
			error: () => {
				this.redirectIfCodeIsNotLoaded();
				this.error = true;
				this.loading = false;
			},
		});
		this.updateCodeForm.controls.language.valueChanges.subscribe(language => {
			this.editorOptions = { ...this.editorOptions, language };
		});
	}

	ngAfterViewChecked(): void {
		this.changeDetectorRef.detectChanges();
	}

	private switchMode(to: 'editing' | 'viewing') {
		this.mode = to;
	}

	handleSuccess() {
		this.switchMode('viewing');
		this.loadCode();
	}

	handleCancel() {
		this.switchMode('viewing');
	}

	handleEdit() {
		this.switchMode('editing');
	}

	private setCode(code: CodeDetail) {
		this.code = code;
		this.updateCodeForm.controls.title.setValue(code.title);
		this.updateCodeForm.controls.description.setValue(code.description);
		this.updateCodeForm.controls.code.setValue(code.draft);
		this.updateCodeForm.controls.language.setValue(code.language);
		if (code.input.length > 0) {
			this.updateCodeForm.controls.inputFileType.setValue(
				code.input[0].fileType
			);
			this.updateCodeForm.controls.inputDescription.setValue(
				code.input[0].description
			);
			this.hasInput.setValue(true);
		}
		if (code.output.length > 0) {
			this.updateCodeForm.controls.outputFileType.setValue(
				code.output[0].fileType
			);
			this.updateCodeForm.controls.outputDescription.setValue(
				code.output[0].description
			);
			this.hasOutput.setValue(true);
		}
		this.loadTestRuns();
	}

	handleFileInputChange($event: Event) {
		const target = $event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
			const validFileType = this.hasInput.value
				? this.updateCodeForm.controls.inputFileType.value === 'png'
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

	testCode() {
		const runTestCodeDto: RunTestCodeDTO = {
			codeContent: this.updateCodeForm.controls.code.value,
			language: this.updateCodeForm.controls.language.value,
		};
		this.codeService
			.runTestCode(
				this.code!.id,
				runTestCodeDto,
				this.fileInput.value ?? undefined
			)
			.subscribe({
				next: () => {
					this.notificationService.showSuccessToast(
						$localize`:@@code.test.launch.success:Code test launched successfully.`
					);
					this.scrollToTestHistory();
					this.resetFileInput();
				},
			});
	}

	loadTestRuns() {
		if (this.code === undefined) {
			return;
		}
		this.codeService.getTestRuns(this.code.id).subscribe({
			next: testRuns => {
				if (this.testRuns.length && this.testRuns.length !== testRuns.length) {
					this.testRuns = testRuns;
					this.notifyNewTestRunArrived();
				}
			},
		});
	}

	private scrollToTestHistory() {
		const latestTestRunElement = document.getElementById('latest_test_run');
		if (latestTestRunElement) {
			latestTestRunElement.scrollIntoView({
				behavior: 'smooth',
			});
			return;
		}
		this.testHistoryElementRef.nativeElement.scrollIntoView({
			behavior: 'smooth',
		});
	}

	private notifyNewTestRunArrived() {
		this.notificationService.showSuccessToast(
			$localize`:@@code.test.new:New test run results arrived.`
		);
		this.scrollToTestHistory();
	}

	private redirectIfCodeIsNotLoaded() {
		this.router.navigate(['/page-not-found']);
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

	private setupPeriodicTestRunRefresh() {
		setInterval(() => {
			this.loadTestRuns();
		}, 10000);
	}
}
