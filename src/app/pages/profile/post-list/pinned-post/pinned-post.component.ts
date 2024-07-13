import { Component, HostListener, Input } from '@angular/core';
import { TimelinePost } from '../../../../models/post.model';
import { IconComponent } from '../../../../component/typography/icon/icon.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectProfilePictureUrl } from '../../../../store/profile/profile.selectors';

@Component({
	selector: 'app-pinned-post',
	standalone: true,
	imports: [IconComponent, RouterLink, NgIf, AsyncPipe],
	templateUrl: './pinned-post.component.html',
	styleUrl: './pinned-post.component.scss',
})
export class PinnedPostComponent {
	@Input() post!: TimelinePost;
	showMenu = false;
	profilePictureUrl$!: Observable<string | undefined>;

	constructor(private store: Store) {
		this.profilePictureUrl$ = this.store.select(selectProfilePictureUrl);
	}

	toggleMenu() {
		this.showMenu = !this.showMenu;
	}

	unpinPost(postId: number) {
		//this.store.dispatch(unpinPost({ postId }));
	}

	deletePost(postId: number) {
		//this.store.dispatch(deletePost({ postId }));
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
