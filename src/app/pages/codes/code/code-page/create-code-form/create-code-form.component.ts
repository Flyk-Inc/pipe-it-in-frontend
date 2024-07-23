import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
	TestRun,
} from '../../../../../models/code.model';
import { ButtonComponent } from '../../../../../component/layout/button/button.component';
import { CodeReportComponent } from '../../../../../component/code/report-history/code-report/code-report.component';
import { DividerModule } from 'primeng/divider';
import { CodeReportHistoryComponent } from '../../../../../component/code/report-history/code-report-history.component';
import { IconComponent } from '../../../../../component/typography/icon/icon.component';
import { CodeService } from '../../../../../service/code.service';
import { NotificationService } from '../../../../../service/notification.service';
import { copyHelper } from '../../../../../models/utils';
import { HttpErrorResponse } from '@angular/common/http';

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

	editorOptions = {
		theme: 'vs-dark',
		language: 'javascript',
	};

	saveStringTranslated = 'save';
	postStringTranslated = 'post';
	cancelStringTranslated = 'cancel';
	editStringTranslated = 'edit';
	private codeVersionAlreadyExistsString = 'alreadyexists';

	constructor(
		private formBuilder: FormBuilder,
		private codeService: CodeService,
		private notificationService: NotificationService
	) {}

	ngOnInit() {
		this.setupLocalizations();
		this.setupForms();
		this.setupInputOutputValidators();
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
					error: (error: HttpErrorResponse) => {
						this.checkSignUpError(error.error.message);
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

	private setupInputOutputValidators() {
		this.hasInput.valueChanges.subscribe(() => {
			this.changeInputOutputValidators();
		});
		this.hasOutput.valueChanges.subscribe(() => {
			this.changeInputOutputValidators();
		});
	}

	private changeInputOutputValidators() {
		if (this.hasInput.value) {
			this.updateCodeForm.controls.inputFileType.setValidators(
				Validators.required
			);
			this.updateCodeForm.controls.inputDescription.setValidators(
				Validators.required
			);
			this.createVersionForm.controls.inputFileType.setValidators(
				Validators.required
			);
			this.createVersionForm.controls.inputDescription.setValidators(
				Validators.required
			);
		} else {
			this.updateCodeForm.controls.inputFileType.clearValidators();
			this.updateCodeForm.controls.inputDescription.clearValidators();
			this.createVersionForm.controls.inputFileType.clearValidators();
			this.createVersionForm.controls.inputDescription.clearValidators();
		}

		if (this.hasOutput.value) {
			this.updateCodeForm.controls.outputFileType.setValidators(
				Validators.required
			);
			this.updateCodeForm.controls.outputDescription.setValidators(
				Validators.required
			);
			this.createVersionForm.controls.outputFileType.setValidators(
				Validators.required
			);
			this.createVersionForm.controls.outputDescription.setValidators(
				Validators.required
			);
		} else {
			this.updateCodeForm.controls.outputFileType.clearValidators();
			this.updateCodeForm.controls.outputDescription.clearValidators();
			this.createVersionForm.controls.outputFileType.clearValidators();
			this.createVersionForm.controls.outputDescription.clearValidators();
		}

		this.updateCodeForm.controls.inputFileType.updateValueAndValidity();
		this.updateCodeForm.controls.inputDescription.updateValueAndValidity();
		this.updateCodeForm.controls.outputFileType.updateValueAndValidity();
		this.updateCodeForm.controls.outputDescription.updateValueAndValidity();
		this.createVersionForm.controls.inputFileType.updateValueAndValidity();
		this.createVersionForm.controls.inputDescription.updateValueAndValidity();
		this.createVersionForm.controls.outputFileType.updateValueAndValidity();
		this.createVersionForm.controls.outputDescription.updateValueAndValidity();
	}

	private setupLocalizations() {
		this.saveStringTranslated = $localize`:@@save.draft:save draft`;
		this.postStringTranslated = $localize`:@@post:post`;
		this.cancelStringTranslated = $localize`:@@cancel:cancel`;
		this.editStringTranslated = $localize`:@@edit:edit`;
		this.saveStringTranslated = $localize`:@@save.draft:save draft`;
		this.codeVersionAlreadyExistsString = $localize`:@@code.version.already.exists:Code version already exists`;
	}

	private setupForms() {
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

		this.loadTestRuns();

		this.editorOptions = {
			theme: 'vs-dark',
			language: this.updateCodeForm.controls.language.value,
		};
	}

	private checkSignUpError(errorMessage: string) {
		switch (errorMessage) {
			case 'code.version.already.exists':
				this.notificationService.showErrorToast(
					this.codeVersionAlreadyExistsString
				);
				break;
			default:
				this.notificationService.getErrorMessage(errorMessage);
				break;
		}
	}

	protected readonly copyHelper = copyHelper;
}
