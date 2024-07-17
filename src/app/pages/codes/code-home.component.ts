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

@Component({
	selector: 'app-codes',
	standalone: true,
	imports: [
		PopularGroupsComponent,
		SidenavComponent,
		TimelineComponent,
		PersonalCodesListComponent,
		TabsComponent,
	],
	templateUrl: './code-home.component.html',
	styleUrl: './code-home.component.scss',
})
export class CodeHomeComponent {
	tabs: TabData[] = [
		{
			title: 'Your codes',
			id: CodeRoutes.PersonalCodes,
			link: `/${codeRoutePath}/${CodeRoutes.PersonalCodes}`,
		},
		{
			title: 'Your codes',
			id: CodeRoutes.PersonalPipelines,
      link: `/${codeRoutePath}/${CodeRoutes.PersonalPipelines}`,
		},
	];
	activeTabId: string = 'personalCodes';
}
