import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IconComponent } from '../../../component/typography/icon/icon.component';
import { Group, GroupMember } from '../../../models/group.model';
import { DatePipe, NgIf } from '@angular/common';

@Component({
	selector: 'app-group',
	standalone: true,
	imports: [IconComponent, DatePipe, NgIf],
	templateUrl: './group.component.html',
	styleUrl: './group.component.scss',
})
export class GroupComponent implements OnInit {
	@Input() group!: Group;
	@Input() currentUserId!: number;
	groupMember!: GroupMember | undefined;

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

	protected readonly environment = environment;
}
