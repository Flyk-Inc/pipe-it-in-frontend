import { Component, HostListener, Input, OnInit } from '@angular/core';
import { TimelinePost } from '../../../../models/post.model';
import { IconComponent } from '../../../../component/typography/icon/icon.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectProfilePictureUrl } from '../../../../store/profile/profile.selectors';
import {
	deletePost,
	unpinPost,
} from '../../../../store/profile/profile.actions';
import { selectUserProfilePictureUrl } from '../../../../store/user-profile/user-profile.selectors';

@Component({
	selector: 'app-pinned-post',
	standalone: true,
	imports: [IconComponent, RouterLink, NgIf, AsyncPipe],
	templateUrl: './pinned-post.component.html',
	styleUrl: './pinned-post.component.scss',
})
export class PinnedPostComponent implements OnInit {
	@Input() post!: TimelinePost;
	@Input() isOwnProfile!: boolean;
	showMenu = false;
	profilePictureUrl$!: Observable<string | undefined>;

	constructor(private store: Store) {}

	ngOnInit() {
		if (this.isOwnProfile) {
			this.profilePictureUrl$ = this.store.select(selectProfilePictureUrl);
		} else {
			this.profilePictureUrl$ = this.store.select(selectUserProfilePictureUrl);
		}
	}

	toggleMenu() {
		this.showMenu = !this.showMenu;
	}

	unpinPost() {
		this.store.dispatch(unpinPost());
	}

	deletePost(postId: number) {
		this.store.dispatch(deletePost({ postId }));
	}

	@HostListener('document:click', ['$event'])
	onDocumentClick(event: Event): void {
		if (!this.showMenu) return;

		const target = event.target as HTMLElement;
		if (!target.closest('.relative')) {
			this.showMenu = false;
		}
	}
}
