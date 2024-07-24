import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CreateCommentDTO, PostComment, TimelinePost } from '../../models/post.model';
import { createComment, likePost, loadPost, loadPostComments } from '../../store/post/post.actions';
import { selectPost, selectPostComments } from '../../store/post/post.selectors';
import { PopularGroupsComponent } from '../home/popular-groups/popular-groups.component';
import { SidenavComponent } from '../../component/nav/sidenav/sidenav.component';
import { TimelineComponent } from '../home/timeline/timeline.component';
import { environment } from '../../../environments/environment';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IconComponent } from '../../component/typography/icon/icon.component';
import {
  VersionMinifiedLinkComponent,
} from '../../component/social/code-minified-link/version-minified-link.component';
import { ButtonComponent } from '../../component/layout/button/button.component';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VersionSelectorComponent } from '../../component/code/version-selector/version-selector.component';
import { SocialService } from '../../service/social.service';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { HighlightAuto } from 'ngx-highlightjs';
import { CommentComponent } from './comment/comment.component';

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
		VersionMinifiedLinkComponent,
		ButtonComponent,
		FormsModule,
		VersionSelectorComponent,
		ReactiveFormsModule,
		HighlightLineNumbers,
		HighlightAuto,
		CommentComponent,
	],
	templateUrl: './post-detail.component.html',
	styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit {
	postId: number = 0;
	post$!: Observable<TimelinePost | null>;
	comments$!: Observable<PostComment[]>;
	textControl = new FormControl('', {
		nonNullable: true,
		validators: [Validators.required],
	});
	commentForm = this.formBuilder.group({
		text: this.textControl,
	});

	publishText = $localize`:@@publish:Publish`;

	constructor(
		private store: Store,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private socialService: SocialService
	) {}

	ngOnInit(): void {
		this.postId = Number(this.route.snapshot.paramMap.get('postId'));
		console.log(this.postId);
		if (this.postId) {
			this.store.dispatch(loadPost({ postId: this.postId }));
		}
		this.store.dispatch(loadPostComments({ postId: this.postId }));
		this.post$ = this.store.select(selectPost);
		this.comments$ = this.store.select(selectPostComments);

		this.socialService.newPostAdded.subscribe(() => {
			this.commentForm.controls['text'].setValue('');
			this.commentForm.reset();
		});
	}

	createComment() {
		const createCommentDTO: CreateCommentDTO = {
			content: this.commentForm.controls['text'].value,
			postId: this.postId,
		};
		if (this.commentForm.valid) {
			this.store.dispatch(
				createComment({ createCommentDTO: createCommentDTO })
			);
		}
	}

	onLikePost(postId: number): void {
		this.store.dispatch(likePost({ postId }));
	}

	protected readonly environment = environment;
}
