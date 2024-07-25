import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Group } from '../../../models/group.model';
import { TimelinePost, CreatePostDto } from '../../../models/post.model';
import { SidenavComponent } from '../../../component/nav/sidenav/sidenav.component';
import { environment } from '../../../../environments/environment';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import {
	selectGroup,
	selectGroupError,
	selectGroupPosts,
} from '../../../store/group-profile/group-profile.selectors';
import {
	joinGroup,
	loadGroup,
	loadGroupPosts,
	requestGroupAccess,
	createPost,
} from '../../../store/group-profile/group-profile.actions';
import { PostListComponent } from './group-profile-post-list/group-profile-post-list.component';
import { AuthenticationService } from '../../../auth/authentication.service';
import { ButtonComponent } from '../../../component/layout/button/button.component';
import {
	FormBuilder,
	FormControl,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { VersionSelectorComponent } from '../../../component/code/version-selector/version-selector.component';
import { Version } from '../../../models/code.model';
import { BasicLayoutComponent } from '../../../component/layout/basic-layout/basic-layout.component';

@Component({
	selector: 'app-group-profile',
	standalone: true,
	imports: [
		SidenavComponent,
		NgIf,
		NgForOf,
		AsyncPipe,
		DatePipe,
		PostListComponent,
		ButtonComponent,
		ReactiveFormsModule,
		VersionSelectorComponent,
		BasicLayoutComponent,
	],
	templateUrl: './group-profile.component.html',
	styleUrls: ['./group-profile.component.scss'],
})
export class GroupProfileComponent implements OnInit {
	group$: Observable<Group | null>;
	posts$: Observable<TimelinePost[]>;
	error$: Observable<string | null>;
	groupId!: number;
	currentUserId: number | null = null;
	isAdmin = false;
	isMember = false;
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
		private store: Store,
		private route: ActivatedRoute,
		private authService: AuthenticationService,
		private formBuilder: FormBuilder
	) {
		this.group$ = this.store.select(selectGroup);
		this.posts$ = this.store.select(selectGroupPosts);
		this.error$ = this.store.select(selectGroupError);
	}

	ngOnInit(): void {
		this.groupId = Number(this.route.snapshot.paramMap.get('groupId'));
		if (this.groupId) {
			this.store.dispatch(loadGroup({ groupId: this.groupId }));
		}
		this.store.dispatch(loadGroupPosts({ groupId: this.groupId }));

		this.authService.currentUserSource.subscribe(user => {
			if (user) {
				this.currentUserId = user.id;
				this.group$.subscribe(group => {
					if (group) {
						this.isAdmin = group.members.some(
							member => member.userId === this.currentUserId && member.isAdmin
						);
						this.isMember = group.members.some(
							member => member.userId === this.currentUserId
						);
					}
				});
			}
		});

		this.posts$.subscribe(() => {
			this.postForm.controls['text'].setValue('');
			this.postForm.reset();
			this.toggleCodeSelector(false);
		});
	}

	createPost() {
		const createPostDTO: CreatePostDto = {
			text: this.postForm.controls['text'].value,
			versionId: this.postForm.controls['versionId'].value ?? undefined,
			groupId: this.groupId,
		};
		if (this.postForm.valid) {
			this.store.dispatch(
				createPost({ createPostDTO: createPostDTO, groupId: this.groupId })
			);
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

	joinGroup(): void {
		this.store.dispatch(joinGroup({ groupId: this.groupId }));
	}

	requestGroupAccess(): void {
		this.store.dispatch(requestGroupAccess({ groupId: this.groupId }));
	}

	protected readonly environment = environment;
}
