import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../../service/social.service';
import { TimelinePost } from '../../../models/post.model';
import { TimelinePostComponent } from '../../../component/social/timeline-post/timeline-post.component';
import { NgFor } from '@angular/common';

@Component({
	selector: 'app-timeline',
	standalone: true,
	imports: [TimelinePostComponent, NgFor],
	templateUrl: './timeline.component.html',
	styleUrl: './timeline.component.scss',
})
export class TimelineComponent implements OnInit {
	posts: TimelinePost[] = [];
	postsCursor: string = '';

	constructor(private socialService: SocialService) {}

	ngOnInit() {
		this.initPostsData();
	}

	initPostsData() {
		this.socialService.getTimeLinePosts().subscribe(paginatedPosts => {
			this.posts = paginatedPosts.data;
			console.log(this.posts);
			this.postsCursor = paginatedPosts.cursor;
		});
	}

	loadMorePosts() {
		if (this.postsCursor === '') {
			return;
		}
		this.socialService
			.getTimeLinePosts(this.postsCursor)
			.subscribe(paginatedPosts => {
				this.posts = this.posts.concat(paginatedPosts.data);
				this.postsCursor = paginatedPosts.cursor;
			});
	}
}
