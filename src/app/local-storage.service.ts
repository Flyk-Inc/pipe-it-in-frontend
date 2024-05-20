import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	constructor() {}

	setString(value: string, key: string) {
		localStorage.setItem(key, value);
	}

	getString(itemKey: string): string | null {
		return localStorage.getItem(itemKey);
	}

	removeString(itemKey: string) {
		localStorage.removeItem(itemKey);
	}
}
