import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IconComponent } from '../../../component/typography/icon/icon.component';
import { Group, GroupMember } from '../../../models/group.model';
import { DatePipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { leaveGroup } from '../../../store/group/group.actions';
import { Router, RouterLink } from '@angular/router';

@Component({
	selector: 'app-group',
	standalone: true,
	imports: [IconComponent, DatePipe, NgIf, RouterLink],
	templateUrl: './group.component.html',
	styleUrl: './group.component.scss',
})
export class GroupComponent implements OnInit {
	@Input() group!: Group;
	@Input() currentUserId!: number;
	groupMember!: GroupMember | undefined;

	constructor(
		private store: Store,
		private router: Router
	) {}

	ngOnInit() {
		this.groupMember = this.group.members.find(
			member => member.userId === this.currentUserId
		);
	}

	get isAdmin(): boolean {
		return this.groupMember ? this.groupMember.isAdmin : false;
	}

	get joinedAt(): Date | undefined {
		return this.groupMember ? this.groupMember.joinedAt : undefined;
	}

	onLeaveGroup(event: Event): void {
		event.stopPropagation();
		this.store.dispatch(leaveGroup({ groupId: this.group.id }));
	}

	protected readonly environment = environment;
}
