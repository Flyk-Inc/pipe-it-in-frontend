import { Component, Input } from '@angular/core';
import { Group } from '../../../models/group.model';
import { RouterModule } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
	selector: 'app-profile-groups',
	standalone: true,
	imports: [RouterModule, NgFor, AsyncPipe, NgIf],
	templateUrl: './profile-groups.component.html',
	styleUrl: './profile-groups.component.scss',
})
export class ProfileGroupsComponent {
	@Input() userGroups: Group[] | null = [];
}
