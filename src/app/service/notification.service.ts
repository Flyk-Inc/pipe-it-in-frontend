import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	constructor(private primeMessageService: MessageService) {}

	showSuccessToast(message: string) {
		this.primeMessageService.add({
			severity: 'success',
			summary: 'Success',
			detail: message,
		});
	}

	showErrorToast(message: string) {
		this.primeMessageService.add({
			severity: 'error',
			summary: 'Error',
			detail: message,
		});
	}

	getErrorMessage(message: string, closable = true): Message[] {
		return [{ severity: 'error', detail: message, closable: closable }];
	}
}
