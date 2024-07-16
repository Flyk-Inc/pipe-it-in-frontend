import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../../../../component/layout/button/button.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { PaginatorModule } from 'primeng/paginator';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {
	CodeDetail,
	CodeLanguages,
	CodeStatus,
	CreateCodeDTO,
	CreateVersionDTO,
	RunTestCodeDTO,
	TestRun,
} from '../../../../models/code.model';
import { CodeService } from '../../../../service/code.service';
import { NotificationService } from '../../../../service/notification.service';
import { CodeReportComponent } from '../../../../component/code/code-report/code-report.component';
import { DividerModule } from 'primeng/divider';
import { CodeReportHistoryComponent } from '../../../../component/code/report-history/code-report-history.component';
import { IconComponent } from '../../../../component/typography/icon/icon.component';
import { InputHelper, OutputHelper } from '../../../../models/utils';

@Component({
	selector: 'app-create-code-form',
	standalone: true,
	imports: [
		ButtonComponent,
		MonacoEditorModule,
		PaginatorModule,
		ReactiveFormsModule,
		CodeReportComponent,
		DividerModule,
		CodeReportHistoryComponent,
		IconComponent,
	],
	templateUrl: './create-code-form.component.html',
	styleUrl: './create-code-form.component.scss',
})
export class CreateCodeFormComponent implements OnInit {
	@Input() code!: CodeDetail;
	@Input() mode: 'updateCode' | 'createVersion' = 'updateCode';
	@Output() cancel = new EventEmitter<boolean>();
	@Output() successSubmit = new EventEmitter<boolean>();
	testRuns: TestRun[] = [];
	hasInput = new FormControl(false);
	hasOutput = new FormControl(false);

	updateCodeForm!: FormGroup<{
		title: FormControl<string>;
		description: FormControl<string>;
		code: FormControl<string>;
		language: FormControl<CodeLanguages>;
		inputFileType: FormControl<string>;
		outputFileType: FormControl<string>;
		inputDescription: FormControl<string>;
		outputDescription: FormControl<string>;
	}>;

	createVersionForm!: FormGroup<{
		title: FormControl<string>;
		description: FormControl<string>;
		code: FormControl<string>;
		version: FormControl<string>;
		inputFileType: FormControl<string>;
		outputFileType: FormControl<string>;
		inputDescription: FormControl<string>;
		outputDescription: FormControl<string>;
	}>;

	fileInput = new FormControl<File | null>(null);

	editorOptions = {
		theme: 'vs-dark',
		language: 'javascript',
	};

	saveStringTranslated = 'save';
	postStringTranslated = 'post';
	cancelStringTranslated = 'cancel';
	editStringTranslated = 'edit';

	constructor(
		private formBuilder: FormBuilder,
		private codeService: CodeService,
		private notificationService: NotificationService
	) {}

	ngOnInit() {
		this.saveStringTranslated = $localize`:@@save.draft:save draft`;
		this.postStringTranslated = $localize`:@@post:post`;
		this.cancelStringTranslated = $localize`:@@cancel:cancel`;
		this.editStringTranslated = $localize`:@@edit:edit`;
		this.saveStringTranslated = $localize`:@@save.draft:save draft`;
		this.updateCodeForm = this.formBuilder.nonNullable.group({
			title: [this.code.title, Validators.required],
			description: [this.code.description, Validators.required],
			code: [this.code.draft, Validators.required],
			language: [this.code.language, Validators.required],
			inputFileType: [this.code.input[0]?.fileType],
			outputFileType: [this.code.output[0]?.fileType],
			inputDescription: [this.code.input[0]?.description],
			outputDescription: [this.code.output[0]?.description],
		});

		this.createVersionForm = this.formBuilder.nonNullable.group({
			title: [this.code.versionDraft.title, Validators.required],
			description: [this.code.versionDraft.description, Validators.required],
			code: [this.code.draft, Validators.required],
			version: [this.code.versionDraft.version, Validators.required],
			inputFileType: [this.code.input[0]?.fileType],
			outputFileType: [this.code.output[0]?.fileType],
			inputDescription: [this.code.input[0]?.description],
			outputDescription: [this.code.output[0]?.description],
		});

		this.hasInput.setValue(this.code.input.length > 0);
		this.hasOutput.setValue(this.code.output.length > 0);
		this.updateCodeForm.controls.language.valueChanges.subscribe(language => {
			this.editorOptions = { ...this.editorOptions, language };
		});

		this.editorOptions = {
			theme: 'vs-dark',
			language: this.updateCodeForm.controls.language.value,
		};

		this.loadTestRuns();
	}

	submitUpdateCodeForm() {
		if (this.updateCodeForm.valid) {
			const updateCodeDto = this.createFormDto();
			this.codeService.updateCode(this.code.id, updateCodeDto).subscribe({
				next: () => {
					this.notificationService.showSuccessToast(
						$localize`:@@code.update.success:code updated successfully`
					);
					this.emitSuccessEvent();
				},
			});
		}
	}

	submitCreateVersionForm() {
		if (this.createVersionForm.valid) {
			const createVersionDto = this.createVersionFormDto();
			this.codeService
				.createVersion(createVersionDto, this.code?.id)
				.subscribe({
					next: () => {
						this.notificationService.showSuccessToast(
							$localize`:@@code.version.create.success:new code ersion created successfully`
						);
						this.emitSuccessEvent();
					},
				});
		}
	}
	submitCreateFirstVersionForm() {
		if (this.updateCodeForm.valid) {
			const createVersionDto = this.createFirstVersionFormDto();
			this.codeService
				.createVersion(createVersionDto, this.code?.id)
				.subscribe({
					next: () => {
						this.notificationService.showSuccessToast(
							$localize`:@@code.version.create.success:new code ersion created successfully`
						);
						this.emitSuccessEvent();
					},
				});
		}
	}

	createFormDto(): CreateCodeDTO {
		return {
			title: this.updateCodeForm.controls.title.value,
			description: this.updateCodeForm.controls.description.value,
			draft: this.updateCodeForm.controls.code.value,
			language: this.updateCodeForm.controls.language.value,
			input: this.hasInput.value
				? [
						{
							fileType: this.updateCodeForm.controls.inputFileType.value,
							description: this.updateCodeForm.controls.inputDescription.value,
						},
					]
				: [],
			output: this.hasOutput.value
				? [
						{
							fileType: this.updateCodeForm.controls.outputFileType.value,
							description: this.updateCodeForm.controls.outputDescription.value,
						},
					]
				: [],
		};
	}

	emitCancelEvent() {
		this.cancel.emit(true);
	}

	emitSuccessEvent() {
		this.successSubmit.emit(true);
	}

	private createVersionFormDto(): CreateVersionDTO {
		return {
			title: this.createVersionForm.controls.title.value,
			description: this.createVersionForm.controls.description.value,
			codeContent: this.createVersionForm.controls.code.value,
			version: this.createVersionForm.controls.version.value,
			status: CodeStatus.active,
			input: this.hasInput.value
				? [
						{
							fileType: this.createVersionForm.controls.inputFileType.value,
							description:
								this.createVersionForm.controls.inputDescription.value,
						},
					]
				: [],
			output: this.hasOutput.value
				? [
						{
							fileType: this.createVersionForm.controls.outputFileType.value,
							description:
								this.createVersionForm.controls.outputDescription.value,
						},
					]
				: [],
		};
	}

	private createFirstVersionFormDto(): CreateVersionDTO {
		return {
			title: this.updateCodeForm.controls.title.value,
			description: this.updateCodeForm.controls.description.value,
			codeContent: this.updateCodeForm.controls.code.value,
			version: '1.0.0',
			status: CodeStatus.active,
			input: this.hasInput.value
				? [
						{
							fileType: this.updateCodeForm.controls.inputFileType.value,
							description: this.updateCodeForm.controls.inputDescription.value,
						},
					]
				: [],
			output: this.hasOutput.value
				? [
						{
							fileType: this.updateCodeForm.controls.outputFileType.value,
							description: this.updateCodeForm.controls.outputDescription.value,
						},
					]
				: [],
		};
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
				this.code.id,
				runTestCodeDto,
				this.fileInput.value ?? undefined
			)
			.subscribe({
				next: () => {
					this.notificationService.showSuccessToast(
						$localize`:@@code.test.launch.success:Code test launched successfully.`
					);
				},
			});
	}

	loadTestRuns() {
		this.codeService.getTestRuns(this.code.id).subscribe({
			next: testRuns => {
				this.testRuns = testRuns;
			},
			error: () => {
				this.notificationService.showErrorToast(
					$localize`:@@code.test.runs.error:An error occurred while fetching test runs`
				);
			},
		});
	}

	async copyHelper(need: 'read input' | 'write output') {
		if (need === 'read input') {
			switch (this.code.language) {
				case CodeLanguages.javascript:
					await navigator.clipboard.writeText(InputHelper.javascript);
					break;
				case CodeLanguages.python:
					await navigator.clipboard.writeText(InputHelper.python);
					break;
			}
		} else {
			switch (this.code.language) {
				case CodeLanguages.javascript:
					await navigator.clipboard.writeText(OutputHelper.javascript);
					break;
				case CodeLanguages.python:
					await navigator.clipboard.writeText(OutputHelper.python);
					break;
			}
		}
	}
}
