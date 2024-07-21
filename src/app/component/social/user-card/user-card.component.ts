import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserDTO } from '../../../auth/DTO/user.dto';
import { environment } from '../../../../environments/environment';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-user-card',
	standalone: true,
	imports: [NgIf, NgOptimizedImage, RouterLink],
	templateUrl: './user-card.component.html',
	styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
	@Input() user!: UserDTO;
	@Input() isFollowRequest: boolean = false;
	@Output() accept = new EventEmitter<void>();
	@Output() reject = new EventEmitter<void>();
	@Output() remove = new EventEmitter<void>();

	onAccept() {
		this.accept.emit();
	}

	onReject() {
		this.reject.emit();
	}

	onRemove() {
		this.remove.emit();
	}

	protected readonly environment = environment;
}
