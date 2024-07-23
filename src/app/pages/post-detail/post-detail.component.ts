import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PostComment, TimelinePost } from '../../models/post.model';
import {
	dislikeComment,
	likeComment,
	likePost,
	loadPost,
	loadPostComments,
} from '../../store/post/post.actions';
import {
	selectPost,
	selectPostComments,
} from '../../store/post/post.selectors';
import { PopularGroupsComponent } from '../home/popular-groups/popular-groups.component';
import { SidenavComponent } from '../../component/nav/sidenav/sidenav.component';
import { TimelineComponent } from '../home/timeline/timeline.component';
import { environment } from '../../../environments/environment';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IconComponent } from '../../component/typography/icon/icon.component';

@Component({
	selector: 'app-post-detail',
	standalone: true,
	imports: [
		PopularGroupsComponent,
		SidenavComponent,
		TimelineComponent,
		AsyncPipe,
		RouterLink,
		IconComponent,
		NgForOf,
		NgIf,
	],
	templateUrl: './post-detail.component.html',
	styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit {
	post$!: Observable<TimelinePost | null>;
	comments$!: Observable<PostComment[]>;

	constructor(
		private store: Store,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		const postId = Number(this.route.snapshot.paramMap.get('postId'));
		console.log(postId);
		if (postId) {
			this.store.dispatch(loadPost({ postId }));
		}
		this.store.dispatch(loadPostComments({ postId }));
		this.post$ = this.store.select(selectPost);
		this.comments$ = this.store.select(selectPostComments);
	}

	onLikePost(postId: number): void {
		this.store.dispatch(likePost({ postId }));
	}

	onLikeComment(commentId: number): void {
		this.store.dispatch(likeComment({ commentId }));
	}

	onDislikeComment(commentId: number): void {
		this.store.dispatch(dislikeComment({ commentId }));
	}

	protected readonly environment = environment;
}
