import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopularGroupsComponent } from '../home/popular-groups/popular-groups.component';
import { SidenavComponent } from '../../component/nav/sidenav/sidenav.component';
import { ButtonComponent } from '../../component/layout/button/button.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Group } from '../../models/group.model';
import { Store } from '@ngrx/store';
import { createGroup, loadGroups } from '../../store/group/group.actions';
import { selectUserGroups } from '../../store/group/group.selectors';
import { GroupComponent } from './group/group.component';
import { AuthenticationService } from '../../auth/authentication.service';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';

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
		ReactiveFormsModule,
		NgIf,
	],
	templateUrl: './groups.component.html',
	styleUrl: './groups.component.scss',
})
export class GroupsComponent implements OnInit, OnDestroy {
	loggedInUserSubscription$ = this.authenticationService.currentUserSource;
	groups$!: Observable<Group[]>;
	userId: number | null = null;
	showCreateGroup = false;
	groupForm: FormGroup;

	constructor(
		protected authenticationService: AuthenticationService,
		private store: Store,
		private formBuilder: FormBuilder
	) {
		this.groupForm = this.formBuilder.group({
			name: ['', Validators.required],
			description: ['', Validators.required],
			isPrivate: [false],
			profilePicture: [null],
		});
	}

	ngOnInit(): void {
		this.store.dispatch(loadGroups());
		this.groups$ = this.store.select(selectUserGroups);
		this.loggedInUserSubscription$.subscribe(user => {
			if (user) {
				this.userId = user.id;
			}
		});
	}

	onCreateGroup(): void {
		const createGroupDTO = {
			name: this.groupForm.value.name,
			description: this.groupForm.value.description,
			isPrivate: this.groupForm.value.isPrivate,
		};
		this.store.dispatch(createGroup({ group: createGroupDTO }));
		this.showCreateGroup = false;
	}

	ngOnDestroy() {
		this.loggedInUserSubscription$.unsubscribe();
	}
}
