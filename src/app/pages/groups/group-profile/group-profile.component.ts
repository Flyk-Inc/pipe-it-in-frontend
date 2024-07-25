import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Group } from '../../../models/group.model';
import { TimelinePost } from '../../../models/post.model';
import { SidenavComponent } from '../../../component/nav/sidenav/sidenav.component';
import { environment } from '../../../../environments/environment';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { PostListComponent } from '../../profile/post-list/post-list.component';
import { selectGroup, selectGroupError, selectGroupPosts } from '../../../store/group-profile/group-profile.selectors';
import {
  joinGroup,
  loadGroup,
  loadGroupPosts,
  requestGroupAccess,
} from '../../../store/group-profile/group-profile.actions';

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
	],
	templateUrl: './group-profile.component.html',
	styleUrl: './group-profile.component.scss',
})
export class GroupProfileComponent implements OnInit {
	group$: Observable<Group | null>;
	posts$: Observable<TimelinePost[]>;
	error$: Observable<string | null>;
	groupId!: number;

	constructor(
		private store: Store,
		private route: ActivatedRoute
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
	}

	joinGroup(): void {
		this.store.dispatch(joinGroup({ groupId: this.groupId }));
	}

	requestGroupAccess(): void {
		this.store.dispatch(requestGroupAccess({ groupId: this.groupId }));
	}

	protected readonly environment = environment;
}
