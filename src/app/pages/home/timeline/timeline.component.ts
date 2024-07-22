import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../../service/social.service';
import { TimelinePost } from '../../../models/post.model';
import { TimelinePostComponent } from '../../../component/social/timeline-post/timeline-post.component';
import { AsyncPipe, NgClass, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../../../component/layout/button/button.component';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAllPosts } from '../../../store/timeline/timeline.selectors';
import {
	createPost,
	loadPosts,
} from '../../../store/timeline/timeline.actions';

@Component({
	selector: 'app-timeline',
	standalone: true,
	templateUrl: './timeline.component.html',
	styleUrl: './timeline.component.scss',
	imports: [
		TimelinePostComponent,
		NgFor,
		ButtonComponent,
		ReactiveFormsModule,
		NgClass,
		AsyncPipe,
	],
})
export class TimelineComponent implements OnInit {
	posts$!: Observable<TimelinePost[]>;
	textControl = new FormControl('', {
		nonNullable: true,
		validators: [Validators.required],
	});
	postForm: FormGroup;

	constructor(
		private socialService: SocialService,
		private store: Store
	) {
		this.postForm = new FormGroup({
			text: this.textControl,
		});
	}

	ngOnInit() {
		this.posts$ = this.store.select(selectAllPosts);
		this.store.dispatch(loadPosts());
		this.socialService.newPostAdded.subscribe(() => {
			this.postForm.controls['text'].setValue('');
			this.postForm.reset();
		});
	}

	// loadMorePosts() {
	// 	if (this.postsCursor === '') {
	// 		return;
	// 	}
	// 	this.socialService.getTimeLinePosts(this.postsCursor).subscribe();
	// }

	createPost() {
		if (this.postForm.valid) {
			this.store.dispatch(createPost({ createPostDTO: this.postForm.value }));
		}
	}
}
