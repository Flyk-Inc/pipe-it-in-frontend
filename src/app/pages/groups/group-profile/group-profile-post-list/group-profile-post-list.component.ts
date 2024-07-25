import { Component, Input, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TimelinePost } from '../../../../models/post.model';
import { GroupProfilePostComponent } from '../group-profile-post/group-profile-post.component';

@Component({
	selector: 'app-group-profile-post-list',
	standalone: true,
	imports: [AsyncPipe, NgFor, NgIf, GroupProfilePostComponent],
	templateUrl: './group-profile-post-list.component.html',
	styleUrl: './group-profile-post-list.component.scss',
})
export class PostListComponent implements OnInit {
	@Input() posts: TimelinePost[] | null = [];
	@Input() isAdmin!: boolean;

	ngOnInit() {
		console.log(this.posts);
	}
}
