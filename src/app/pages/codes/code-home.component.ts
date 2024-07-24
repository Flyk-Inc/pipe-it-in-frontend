import { Component } from '@angular/core';
import { PopularGroupsComponent } from '../home/popular-groups/popular-groups.component';
import { SidenavComponent } from '../../component/nav/sidenav/sidenav.component';
import { TimelineComponent } from '../home/timeline/timeline.component';
import { PersonalCodesListComponent } from './personal-codes-list/personal-codes-list.component';
import {
	TabData,
	TabsComponent,
} from '../../component/layout/tabs/tabs.component';
import { codeRoutePath, CodeRoutes } from './routes';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-codes',
	standalone: true,
	imports: [
		PopularGroupsComponent,
		SidenavComponent,
		TimelineComponent,
		PersonalCodesListComponent,
		TabsComponent,
		RouterOutlet,
	],
	templateUrl: './code-home.component.html',
})
export class CodeHomeComponent {
	tabs: TabData[] = [
		{
			title: $localize`:@@codes:your codes`,
			id: CodeRoutes.Codes,
			link: `/${codeRoutePath}/${CodeRoutes.Codes}`,
		},
		{
			title: $localize`:@@pipelines:your pipelines`,
			id: CodeRoutes.Pipelines,
			link: `/${codeRoutePath}/${CodeRoutes.Pipelines}`,
		},
	];
}
