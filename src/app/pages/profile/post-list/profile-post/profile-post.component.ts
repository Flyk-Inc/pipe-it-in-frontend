import { Component, Input } from '@angular/core';
import { TimelinePost } from '../../../../models/post.model';
import { IconComponent } from '../../../../component/typography/icon/icon.component';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-profile-post',
	standalone: true,
	imports: [IconComponent, RouterLink],
	templateUrl: './profile-post.component.html',
	styleUrl: './profile-post.component.scss',
})
export class ProfilePostComponent {
	@Input() post!: TimelinePost;
}
