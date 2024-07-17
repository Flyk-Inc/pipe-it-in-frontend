import {
	AfterViewChecked,
	ChangeDetectorRef,
	Component,
	OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { HighlightAuto } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import 'highlight.js/styles/androidstudio.min.css';
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
import { CodeReportComponent } from '../../../../component/code/code-report/code-report.component';
import { CodeReportHistoryComponent } from '../../../../component/code/report-history/code-report-history.component';
import { CodeDetail, CodeLanguages, TestRun } from '../../../../models/code.model';
import { CodeService } from '../../../../service/code.service';

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
	code?: CodeDetail;
	loading = true;
	error = false;
	testRuns: TestRun[] = [];

	hasInput = new FormControl(false);
	hasOutput = new FormControl(false);
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
		private codeService: CodeService,
		private formBuilder: FormBuilder,
		private changeDetectorRef: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.saveStringTranslated = $localize`:@@save.draft:save draft`;
		this.postStringTranslated = $localize`:@@post:post`;
		this.cancelStringTranslated = $localize`:@@cancel:cancel`;
		this.editStringTranslated = $localize`:@@edit:edit`;
		this.loadCode();
	}

	loadCode() {
		const codeId = Number(this.route.snapshot.params['id']);
		this.codeService.getCodeDetailById(codeId).subscribe({
			next: receivedCode => {
				this.setCode(receivedCode);
				this.loading = false;
			},
			error: () => {
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

	loadTestRuns() {
		if (this.code === undefined) {
			return;
		}
		this.codeService.getTestRuns(this.code.id).subscribe({
			next: testRuns => {
				this.testRuns = testRuns;
			},
		});
	}
}
