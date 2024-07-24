import { Component, Input } from '@angular/core';
import { replyToComment } from '../../../../store/post/post.actions';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreateCommentDTO, PostComment } from '../../../../models/post.model';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { DatePipe, NgIf } from '@angular/common';
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
	],
	templateUrl: './replies.component.html',
	styleUrl: './replies.component.scss',
})
export class RepliesComponent {
	@Input() comment!: PostComment;
	@Input() postId!: number;
	replyForm: FormGroup;
	textControl = new FormControl('', [Validators.required]);

	constructor(private store: Store) {
		this.replyForm = new FormGroup({
			replyContent: this.textControl,
		});
	}

	onLikeComment(commentId: number) {
		// Implémentez la logique de like
	}

	onDislikeComment(commentId: number) {
		// Implémentez la logique de dislike
	}

	protected readonly environment = environment;
}
