import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	constructor(private primeMessageService: MessageService) {}

	errorString = $localize`:@@error:Error`;
	successString = $localize`:@@success:Success`;

	showSuccessToast(message: string) {
		this.primeMessageService.add({
			severity: 'success',
			summary: this.successString,
			detail: message,
		});
	}

	showInfoToast(message: string) {
		this.primeMessageService.add({
			severity: 'info',
			summary: 'Info',
			detail: message,
		});
	}

	showErrorToast(message: string) {
		this.primeMessageService.add({
			severity: 'error',
			summary: this.errorString,
			detail: message,
		});
	}

	getErrorMessage(message: string, closable = true): Message[] {
		return [{ severity: 'error', detail: message, closable: closable }];
	}
}
