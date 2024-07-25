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
			detail: this.toUpperCaseFirstLetter(message),
		});
	}

	showInfoToast(message: string) {
		this.primeMessageService.add({
			severity: 'info',
			summary: 'Info',
			detail: this.toUpperCaseFirstLetter(message),
		});
	}

	showErrorToast(message: string) {
		this.primeMessageService.add({
			severity: 'error',
			summary: this.errorString,
			detail: this.toUpperCaseFirstLetter(message),
		});
	}

	getErrorMessage(message: string, closable = true): Message[] {
		return [{ severity: 'error', detail: message, closable: closable }];
	}

	toUpperCaseFirstLetter(string: string): string {
		if (!string) {
			return '';
		}
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}
