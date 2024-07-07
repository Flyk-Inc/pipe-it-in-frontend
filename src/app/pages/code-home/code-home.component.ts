import { Component } from '@angular/core';
import { CodesTimelineComponent } from '../pipelines/codes-timeline/codes-timeline.component';
import { SidenavComponent } from '../../component/nav/sidenav/sidenav.component';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-code-home',
	standalone: true,
	imports: [CodesTimelineComponent, SidenavComponent, RouterOutlet],
	templateUrl: './code-home.component.html',
	styleUrl: './code-home.component.scss',
})
export class CodeHomeComponent {}
