import { Component, Input, OnInit } from '@angular/core';
import {
	dislikeComment,
	likeComment,
	undislikeComment,
	unlikeComment,
	updateCommentReaction,
} from '../../../../store/post/post.actions';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { PostComment } from '../../../../models/post.model';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { IconComponent } from '../../../../component/typography/icon/icon.component';
import { ButtonComponent } from '../../../../component/layout/button/button.component';

@Component({
	selector: 'app-replies',
	standalone: true,
	imports: [
		RouterLink,
		DatePipe,
		IconComponent,
		ReactiveFormsModule,
		ButtonComponent,
		NgIf,
		NgClass,
	],
	templateUrl: './replies.component.html',
	styleUrl: './replies.component.scss',
})
export class RepliesComponent implements OnInit {
	@Input() comment!: PostComment;
	@Input() postId!: number;
	likeCount: number = 0;
	dislikeCount: number = 0;
	isLiked: boolean = false;
	isDisliked: boolean = false;
	replyForm: FormGroup;
	textControl = new FormControl('', [Validators.required]);

	constructor(private store: Store) {
		this.replyForm = new FormGroup({
			replyContent: this.textControl,
		});
	}

	ngOnInit() {
		if (this.comment.reactions) {
			this.likeCount = this.comment.reactions.filter(
				reaction => reaction.isLike
			).length;
			this.dislikeCount = this.comment.reactions.filter(
				reaction => !reaction.isLike
			).length;

			const userId = this.comment.user.id;

			this.isLiked = this.comment.reactions.some(
				r => r.user.id == userId && r.isLike
			);
			this.isDisliked = this.comment.reactions.some(
				r => r.user.id == userId && !r.isLike
			);
		}
	}

	onLikeComment(commentId: number): void {
		if (this.comment.reactions?.some(r => r.isLike)) {
			this.store.dispatch(unlikeComment({ commentId }));
		} else if (this.comment.reactions?.some(r => !r.isLike)) {
			this.store.dispatch(updateCommentReaction({ commentId, isLike: true }));
		} else {
			this.store.dispatch(likeComment({ commentId }));
		}
	}

	onDislikeComment(commentId: number): void {
		if (this.comment.reactions?.some(r => !r.isLike)) {
			this.store.dispatch(undislikeComment({ commentId }));
		} else if (this.comment.reactions?.some(r => r.isLike)) {
			this.store.dispatch(updateCommentReaction({ commentId, isLike: false }));
		} else {
			this.store.dispatch(dislikeComment({ commentId }));
		}
	}

	protected readonly environment = environment;
}
