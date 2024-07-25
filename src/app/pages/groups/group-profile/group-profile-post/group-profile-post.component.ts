import { Component, HostListener, Input, OnInit } from '@angular/core';
import { TimelinePost } from '../../../../models/post.model';
import { IconComponent } from '../../../../component/typography/icon/icon.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectProfilePictureUrl } from '../../../../store/profile/profile.selectors';
import { environment } from '../../../../../environments/environment';
import { VersionMinifiedLinkComponent } from '../../../../component/social/code-minified-link/version-minified-link.component';

@Component({
	selector: 'app-group-profile-post',
	standalone: true,
	imports: [
		IconComponent,
		RouterLink,
		NgIf,
		AsyncPipe,
		NgOptimizedImage,
		VersionMinifiedLinkComponent,
	],
	templateUrl: './group-profile-post.component.html',
	styleUrl: './group-profile-post.component.scss',
})
export class GroupProfilePostComponent implements OnInit {
	@Input() post!: TimelinePost;
	@Input() isAdmin!: boolean;
	showMenu = false;
	profilePictureUrl$!: Observable<string | undefined>;

	constructor(private store: Store) {}

	ngOnInit() {
		this.profilePictureUrl$ = this.profilePictureUrl$ = this.store.select(
			selectProfilePictureUrl
		);
	}

	@HostListener('document:click', ['$event'])
	onDocumentClick(event: Event): void {
		if (!this.showMenu) return;

		const target = event.target as HTMLElement;
		if (!target.closest('.relative')) {
			this.showMenu = false;
		}
	}

	protected readonly environment = environment;
}
