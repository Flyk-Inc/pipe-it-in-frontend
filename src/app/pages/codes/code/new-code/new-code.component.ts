import {
	AfterViewChecked,
	ChangeDetectorRef,
	Component,
	OnInit,
} from '@angular/core';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
	FormBuilder,
	FormControl,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ButtonComponent } from '../../../../component/layout/button/button.component';
import { CodeLanguages, CreateCodeDTO } from '../../../../models/code.model';
import { CodeService } from '../../../../service/code.service';
import { codeRoutePath, CodeRoutes } from '../../routes';
import { copyHelper } from '../../../../models/utils';

@Component({
	selector: 'app-new-code',
	standalone: true,
	imports: [
		HighlightLineNumbers,
		NgOptimizedImage,
		RouterLink,
		FormsModule,
		ReactiveFormsModule,
		MonacoEditorModule,
		ButtonComponent,
	],
	templateUrl: './new-code.component.html',
	styleUrl: './new-code.component.scss',
})
export class NewCodeComponent implements OnInit, AfterViewChecked {
	hasInput = new FormControl(false);
	hasOutput = new FormControl(false);
	createCodeForm = this.formBuilder.nonNullable.group({
		title: ['', Validators.required],
		description: ['', Validators.required],
		code: ['', Validators.required],
		language: [CodeLanguages.javascript, Validators.required],
		inputFileType: ['', this.hasInput.value ? Validators.required : []],
		outputFileType: ['', this.hasOutput.value ? Validators.required : []],
		inputDescription: ['', this.hasInput.value ? Validators.required : []],
		outputDescription: ['', this.hasOutput.value ? Validators.required : []],
	});

	editorOptions = {
		theme: 'vs-dark',
		language: this.createCodeForm.controls.language.value,
		lineNumbers: function (lineNumber: string) {
			return `<span style="padding-right:4px">${lineNumber}</span>`;
		},
	};

	saveStringTranslated = 'Save';
	codeInputHelperText = '';
	codeOutputHelperText = '';

	constructor(
		private formBuilder: FormBuilder,
		private codeService: CodeService,
		private router: Router,
		private changeDetectorRef: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.saveStringTranslated = $localize`:@@save.draft:save draft`;
		this.codeInputHelperText = $localize`:@@code.input.helper:Input file type and description are optional`;
		this.codeOutputHelperText = $localize`:@@code.output.helper:Output file type and description are optional`;
		this.createCodeForm.controls.language.valueChanges.subscribe(language => {
			this.editorOptions = { ...this.editorOptions, language };
		});
		this.setupInputOutputValidators();
	}

	ngAfterViewChecked(): void {
		this.changeDetectorRef.detectChanges();
	}

	submitCreateCodeForm() {
		if (this.createCodeForm.valid) {
			const createCodeDto = this.createFormDto();
			this.codeService.createCode(createCodeDto).subscribe({
				next: createdCode => {
					this.router
						.navigate([
							`/${codeRoutePath}/${CodeRoutes.Page}/${createdCode.id}`,
						])
						.then();
				},
			});
		}
	}

	createFormDto(): CreateCodeDTO {
		return {
			title: this.createCodeForm.controls.title.value,
			description: this.createCodeForm.controls.description.value,
			draft: this.createCodeForm.controls.code.value,
			language: this.createCodeForm.controls.language.value,
			input: this.hasInput.value
				? [
						{
							fileType: this.createCodeForm.controls.inputFileType.value,
							description: this.createCodeForm.controls.inputDescription.value,
						},
					]
				: [],
			output: this.hasOutput.value
				? [
						{
							fileType: this.createCodeForm.controls.outputFileType.value,
							description: this.createCodeForm.controls.outputDescription.value,
						},
					]
				: [],
		};
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
			this.createCodeForm.controls.inputFileType.setValidators(
				Validators.required
			);
			this.createCodeForm.controls.inputDescription.setValidators(
				Validators.required
			);
		} else {
			this.createCodeForm.controls.inputFileType.clearValidators();
			this.createCodeForm.controls.inputDescription.clearValidators();
		}

		if (this.hasOutput.value) {
			this.createCodeForm.controls.outputFileType.setValidators(
				Validators.required
			);
			this.createCodeForm.controls.outputDescription.setValidators(
				Validators.required
			);
		} else {
			this.createCodeForm.controls.outputFileType.clearValidators();
			this.createCodeForm.controls.outputDescription.clearValidators();
		}

		this.createCodeForm.controls.inputFileType.updateValueAndValidity();
		this.createCodeForm.controls.inputDescription.updateValueAndValidity();
		this.createCodeForm.controls.outputFileType.updateValueAndValidity();
		this.createCodeForm.controls.outputDescription.updateValueAndValidity();
	}

	protected readonly copyHelper = copyHelper;
}
