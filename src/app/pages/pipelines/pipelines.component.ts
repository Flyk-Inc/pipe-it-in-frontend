import { Component } from '@angular/core';
import { PopularGroupsComponent } from '../home/popular-groups/popular-groups.component';
import { SidenavComponent } from '../../component/nav/sidenav/sidenav.component';
import { TimelineComponent } from '../home/timeline/timeline.component';
import { CodesTimelineComponent } from './codes-timeline/codes-timeline.component';
import { TimelineCode, Version } from '../../models/code.model';

export interface CodeDetail extends TimelineCode {
	versions: Version[];
}

@Component({
	selector: 'app-pipelines',
	standalone: true,
	imports: [
		PopularGroupsComponent,
		SidenavComponent,
		TimelineComponent,
		CodesTimelineComponent,
	],
	templateUrl: './pipelines.component.html',
	styleUrl: './pipelines.component.scss',
})
export class PipelinesComponent {}
