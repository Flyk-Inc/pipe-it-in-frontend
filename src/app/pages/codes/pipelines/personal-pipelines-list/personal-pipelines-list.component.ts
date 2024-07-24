import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { CodeTimelineItemComponent } from '../../personal-codes-list/code-timeline-item/code-timeline-item.component';
import { IconComponent } from '../../../../component/typography/icon/icon.component';
import { RouterLink } from '@angular/router';
import { UnderlineComponent } from '../../../../component/layout/underline/underline.component';
import { codeRoutePath } from '../../routes';
import { CodePipelineRoutes, pipelineRoutePath } from '../routes';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TimelinePipeline } from '../../../../models/pipeline.model';
import { selectAllPersonalPipelines } from '../../../../store/pipeline/pipeline.selectors';
import {
	loadAllTimelinePipelines,
	loadPersonalPipelines,
} from '../../../../store/pipeline/pipeline.actions';
import { PersonalPipelinesItemComponent } from '../../personal-pipelines-item/personal-pipelines-item.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-personal-pipelines-list',
	standalone: true,
	imports: [
		AsyncPipe,
		CodeTimelineItemComponent,
		IconComponent,
		NgForOf,
		RouterLink,
		UnderlineComponent,
		PersonalPipelinesItemComponent,
		FormsModule,
		ReactiveFormsModule,
	],
	templateUrl: './personal-pipelines-list.component.html',
	styleUrl: './personal-pipelines-list.component.scss',
})
export class PersonalPipelinesListComponent implements OnInit {
	pipelines$!: Observable<TimelinePipeline[]>;

	personalPipelinesOnly = new FormControl(true);

	constructor(private store: Store) {}

	ngOnInit() {
		this.store.dispatch(loadPersonalPipelines());
		this.pipelines$ = this.store.select(selectAllPersonalPipelines);
		this.personalPipelinesOnly.valueChanges.subscribe(() => {
			this.selectPipelineForTimeline();
		});
	}

	selectPipelineForTimeline() {
		if (this.personalPipelinesOnly.value) {
			this.store.dispatch(loadPersonalPipelines());
		} else {
			this.store.dispatch(loadAllTimelinePipelines());
		}
	}

	protected readonly codeRoutePath = codeRoutePath;
	protected readonly CodePipelineRoutes = CodePipelineRoutes;
	protected readonly pipelineRoutePath = pipelineRoutePath;
}
