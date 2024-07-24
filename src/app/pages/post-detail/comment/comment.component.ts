import { Component, Input } from '@angular/core';
import { CreateCommentDTO, PostComment } from '../../../models/post.model';
import { Store } from '@ngrx/store';
import {
	dislikeComment,
	likeComment,
	replyToComment,
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
export class CommentComponent {
	@Input() postId!: number;
	@Input() comment!: PostComment;
	isReplying = false;
	isExpanded: boolean = false;
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

	onLikeComment(commentId: number): void {
		this.store.dispatch(likeComment({ commentId }));
	}

	onDislikeComment(commentId: number): void {
		this.store.dispatch(dislikeComment({ commentId }));
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
