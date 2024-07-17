import { Component, OnInit } from '@angular/core';
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
export class NewCodeComponent implements OnInit {
	hasInput = new FormControl(false);
	hasOutput = new FormControl(false);
	createCodeForm = this.formBuilder.nonNullable.group({
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
		language: this.createCodeForm.controls.language.value,
	};

	saveStringTranslated = 'Save';

	constructor(
		private formBuilder: FormBuilder,
		private codeService: CodeService,
		private router: Router
	) {}

	ngOnInit() {
		this.saveStringTranslated = $localize`:@@save.draft:save draft`;
		this.createCodeForm.controls.language.valueChanges.subscribe(language => {
			this.editorOptions = { ...this.editorOptions, language };
		});
	}

	submitCreateCodeForm() {
		if (this.createCodeForm.valid) {
			const createCodeDto = this.createFormDto();
			this.codeService.createCode(createCodeDto).subscribe({
				next: createdCode => {
					this.router.navigate(['/code/' + createdCode.id]).then();
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
}
