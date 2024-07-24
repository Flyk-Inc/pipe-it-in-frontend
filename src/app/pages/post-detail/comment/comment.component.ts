import { Component, Input, OnInit } from '@angular/core';
import { CreateCommentDTO, PostComment } from '../../../models/post.model';
import { Store } from '@ngrx/store';
import {
	dislikeComment,
	likeComment,
	replyToComment,
	undislikeComment,
	unlikeComment,
	updateCommentReaction,
} from '../../../store/post/post.actions';
import { RouterLink } from '@angular/router';
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { IconComponent } from '../../../component/typography/icon/icon.component';
import { environment } from '../../../../environments/environment';
import {
	FormBuilder,
	FormControl,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../component/layout/button/button.component';
import { RepliesComponent } from './replies/replies.component';

@Component({
	selector: 'app-comment',
	standalone: true,
	imports: [
		RouterLink,
		DatePipe,
		IconComponent,
		NgIf,
		NgForOf,
		ReactiveFormsModule,
		ButtonComponent,
		FormsModule,
		NgClass,
		RepliesComponent,
	],
	templateUrl: './comment.component.html',
	styleUrl: './comment.component.scss',
})
export class CommentComponent implements OnInit {
	@Input() postId!: number;
	@Input() comment!: PostComment;
	isReplying = false;
	isExpanded: boolean = false;
	isLiked: boolean = false;
	isDisliked: boolean = false;
	likeCount: number = 0;
	dislikeCount: number = 0;
	textControl = new FormControl('', {
		nonNullable: true,
		validators: [Validators.required],
	});
	replyForm = this.formBuilder.group({
		replyContent: this.textControl,
	});

	publishText = $localize`:@@publish:Publish`;

	constructor(
		private store: Store,
		private formBuilder: FormBuilder
	) {}

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

	toggleReplying() {
		this.isReplying = !this.isReplying;
	}

	onSubmitReply() {
		if (this.replyForm.valid) {
			const replyContent = this.replyForm.get('replyContent')?.value;
			const createCommentDTO: CreateCommentDTO = {
				postId: this.postId,
				content: replyContent!,
				parentId: this.comment.id,
			};
			this.store.dispatch(replyToComment({ createCommentDTO }));
			this.replyForm.reset();
			this.isReplying = false;
		}
	}

	toggleReplies(): void {
		this.isExpanded = !this.isExpanded;
	}

	protected readonly environment = environment;
}
