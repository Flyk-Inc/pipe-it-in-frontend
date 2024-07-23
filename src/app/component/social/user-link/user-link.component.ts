import { Component, Input } from '@angular/core';
import { fileUrl } from '../../../models/utils';
import { UserDTO } from '../../../auth/DTO/user.dto';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-user-link',
	standalone: true,
	imports: [NgOptimizedImage, RouterLink],
	templateUrl: './user-link.component.html',
})
export class UserLinkComponent {
	protected readonly fileUrl = fileUrl;
	@Input() user!: UserDTO;
}
