import { Component, Input } from '@angular/core';
import { TimelinePost } from '../../../models/post.model';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ProfilePostComponent } from './profile-post/profile-post.component';

@Component({
	selector: 'app-post-list',
	standalone: true,
	imports: [AsyncPipe, NgFor, NgIf, ProfilePostComponent],
	templateUrl: './post-list.component.html',
	styleUrl: './post-list.component.scss',
})
export class PostListComponent {
	@Input() posts: TimelinePost[] | null = [];
	@Input() isOwnProfile!: boolean;
}
