import { Component, Input } from '@angular/core';
import { TimelineCode } from '../../../../models/code.model';
import { IconComponent } from '../../../../component/typography/icon/icon.component';
import { NgIf, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { codeRoutePath, CodeRoutes } from '../../routes';
import { fileUrl } from '../../../../models/utils';
import { UserLinkComponent } from '../../../../component/social/user-link/user-link.component';

@Component({
	selector: 'app-code-timeline-item',
	standalone: true,
	imports: [
		IconComponent,
		NgOptimizedImage,
		RouterLink,
		NgIf,
		TitleCasePipe,
		UserLinkComponent,
	],
	templateUrl: './code-timeline-item.component.html',
})
export class CodeTimelineItemComponent {
	@Input() code!: TimelineCode;
	protected readonly codeRoutePath = codeRoutePath;
	protected readonly CodeRoutes = CodeRoutes;
	protected readonly fileUrl = fileUrl;
}
