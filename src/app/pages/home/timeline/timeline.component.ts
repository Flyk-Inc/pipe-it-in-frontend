import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../../service/social.service';
import { CreatePostDto, TimelinePost } from '../../../models/post.model';
import { TimelinePostComponent } from '../../../component/social/timeline-post/timeline-post.component';
import { AsyncPipe, NgClass, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../../../component/layout/button/button.component';
import {
	FormBuilder,
	FormControl,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAllPosts } from '../../../store/timeline/timeline.selectors';
import {
	createPost,
	loadPosts,
} from '../../../store/timeline/timeline.actions';
import { VersionSelectorComponent } from '../../../component/code/version-selector/version-selector.component';
import { Version } from '../../../models/code.model';

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
		VersionSelectorComponent,
	],
})
export class TimelineComponent implements OnInit {
	posts$!: Observable<TimelinePost[]>;
	textControl = new FormControl('', {
		nonNullable: true,
		validators: [Validators.required],
	});
	postForm = this.formBuilder.group({
		text: this.textControl,
		versionId: [null as number | null],
	});
	displayCodeSelector = false;

	publishText = $localize`:@@publish:Publish`;
	linkACode = $localize`:@@code.link.action:Link a code`;

	constructor(
		private socialService: SocialService,
		private store: Store,
		private formBuilder: FormBuilder
	) {}

	ngOnInit() {
		this.posts$ = this.store.select(selectAllPosts);
		this.store.dispatch(loadPosts());
		this.socialService.newPostAdded.subscribe(() => {
			this.postForm.controls['text'].setValue('');
			this.postForm.reset();
			this.toggleCodeSelector(false);
		});
	}

	// loadMorePosts() {
	// 	if (this.postsCursor === '') {
	// 		return;
	// 	}
	// 	this.socialService.getTimeLinePosts(this.postsCursor).subscribe();
	// }

	createPost() {
		const createPostDTO: CreatePostDto = {
			text: this.postForm.controls['text'].value,
			versionId: this.postForm.controls['versionId'].value ?? undefined,
		};
		if (this.postForm.valid) {
			this.store.dispatch(createPost({ createPostDTO: createPostDTO }));
		}
	}

	toggleCodeSelector(to: boolean) {
		this.displayCodeSelector = to;
		this.postForm.controls.versionId.setValue(null);
	}

	attachVersion($event: Version | null) {
		if ($event === null) {
			this.postForm.controls.versionId.setValue(null);
			return;
		}
		this.postForm.controls.versionId.setValue($event.id);
	}
}
