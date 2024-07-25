import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopularGroupsComponent } from '../home/popular-groups/popular-groups.component';
import { SidenavComponent } from '../../component/nav/sidenav/sidenav.component';
import { ButtonComponent } from '../../component/layout/button/button.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Observable } from 'rxjs';
import { Group } from '../../models/group.model';
import { Store } from '@ngrx/store';
import { loadGroups } from '../../store/group/group.actions';
import { selectUserGroups } from '../../store/group/group.selectors';
import { GroupComponent } from './group/group.component';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
	selector: 'app-groups',
	standalone: true,
	imports: [
		PopularGroupsComponent,
		SidenavComponent,
		ButtonComponent,
		AsyncPipe,
		GroupComponent,
		NgForOf,
	],
	templateUrl: './groups.component.html',
	styleUrl: './groups.component.scss',
})
export class GroupsComponent implements OnInit, OnDestroy {
	loggedInUserSubscription$ = this.authenticationService.currentUserSource;
	groups$!: Observable<Group[]>;
	userId: number | null = null;

	constructor(
		protected authenticationService: AuthenticationService,
		private store: Store
	) {}

	ngOnInit(): void {
		this.store.dispatch(loadGroups());
		this.groups$ = this.store.select(selectUserGroups);
		this.loggedInUserSubscription$.subscribe(user => {
			if (user) {
				this.userId = user.id;
			}
		});
	}

	createGroup(): void {
		// Logic to open group creation modal or navigate to group creation page
	}

	ngOnDestroy() {
		this.loggedInUserSubscription$.unsubscribe();
	}
}
