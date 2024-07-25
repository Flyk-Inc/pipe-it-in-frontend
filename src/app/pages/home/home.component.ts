import { Component } from '@angular/core';
import { SidenavComponent } from '../../component/nav/sidenav/sidenav.component';
import { TimelineComponent } from './timeline/timeline.component';
import { PopularGroupsComponent } from './popular-groups/popular-groups.component';
import { BasicLayoutComponent } from '../../component/layout/basic-layout/basic-layout.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		SidenavComponent,
		TimelineComponent,
		PopularGroupsComponent,
		BasicLayoutComponent,
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {}
