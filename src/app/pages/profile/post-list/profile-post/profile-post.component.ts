import { Component, HostListener, Input, OnInit } from '@angular/core';
import { TimelinePost } from '../../../../models/post.model';
import { IconComponent } from '../../../../component/typography/icon/icon.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectProfilePictureUrl } from '../../../../store/profile/profile.selectors';
import { deletePost, pinPost } from '../../../../store/profile/profile.actions';
import { selectUserProfilePictureUrl } from '../../../../store/user-profile/user-profile.selectors';

@Component({
	selector: 'app-profile-post',
	standalone: true,
	imports: [IconComponent, RouterLink, NgIf, AsyncPipe],
	templateUrl: './profile-post.component.html',
	styleUrl: './profile-post.component.scss',
})
export class ProfilePostComponent implements OnInit {
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

	pinPost(postId: number) {
		this.store.dispatch(pinPost({ postId }));
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
