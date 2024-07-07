import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CodeService } from '../../../service/code.service';
import { CodeDetail } from '../../pipelines/pipelines.component';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { HighlightAuto } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import 'highlight.js/styles/androidstudio.min.css';
import { PanelModule } from 'primeng/panel';

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
	],
	templateUrl: './code-page.component.html',
	styleUrl: './code-page.component.scss',
})
export class CodePageComponent implements OnInit {
	code?: CodeDetail;
	loading = true;
	error = false;

	constructor(
		private route: ActivatedRoute,
		private codeService: CodeService
	) {}

	ngOnInit() {
		const codeId = Number(this.route.snapshot.params['id']);
		this.codeService.getCodeDetailById(codeId).subscribe(
			codes => {
				this.code = codes;
				this.loading = false;
			},
			() => {
				this.error = true;
				this.loading = false;
			}
		);
	}
}
