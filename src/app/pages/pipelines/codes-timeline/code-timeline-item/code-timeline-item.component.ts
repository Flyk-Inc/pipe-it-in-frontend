import { Component, Input } from '@angular/core';
import { TimelineCode } from '../../../../models/code.model';
import { IconComponent } from '../../../../component/typography/icon/icon.component';
import { NgIf, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-code-timeline-item',
	standalone: true,
	imports: [IconComponent, NgOptimizedImage, RouterLink, NgIf, TitleCasePipe],
	templateUrl: './code-timeline-item.component.html',
	styleUrl: './code-timeline-item.component.scss',
})
export class CodeTimelineItemComponent {
	@Input() code!: TimelineCode;
}
