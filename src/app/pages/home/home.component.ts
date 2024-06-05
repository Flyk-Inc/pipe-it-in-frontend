import { Component } from '@angular/core';
import { SidenavComponent } from '../../component/nav/sidenav/sidenav.component';
import { TimelineComponent } from './timeline/timeline.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [SidenavComponent, TimelineComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {}
