import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '../../component/nav/sidenav/sidenav.component';
import { FollowRequest, UserDTO, UserFollows } from '../../auth/DTO/user.dto';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserCardComponent } from '../../component/social/user-card/user-card.component';
import {
	selectFollowers,
	selectFollowRequests,
} from '../../store/profile/profile.selectors';
import {
	acceptFollowRequest,
	loadProfile,
	rejectFollowRequest,
	removeFollower,
} from '../../store/profile/profile.actions';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';

@Component({
	selector: 'app-followers',
	standalone: true,
	imports: [CommonModule, SidenavComponent, UserCardComponent, AsyncPipe, NgIf],
	templateUrl: './followers.component.html',
	styleUrls: ['./followers.component.scss'],
})
export class FollowersComponent implements OnInit {
	followRequests$!: Observable<FollowRequest[]>;
	followers$!: Observable<UserFollows[]>;

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.store.dispatch(loadProfile());
		this.followRequests$ = this.store.select(selectFollowRequests);
		this.followers$ = this.store.select(selectFollowers);
	}

	onAccept(follower: UserDTO) {
		this.store.dispatch(acceptFollowRequest({ userId: follower.id }));
	}

	onReject(user: UserDTO) {
		this.store.dispatch(rejectFollowRequest({ userId: user.id }));
	}

	onRemove(user: UserDTO) {
		this.store.dispatch(removeFollower({ userId: user.id }));
	}
}
