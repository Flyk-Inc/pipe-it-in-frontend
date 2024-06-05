import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	private darkMode = new BehaviorSubject<boolean>(false);

	constructor() {
		this.initTheme();
	}

	initTheme() {
		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
		this.darkMode.next(prefersDarkScheme.matches);
		prefersDarkScheme.addEventListener('change', e => {
			this.darkMode.next(e.matches);
		});
	}

	isDarkMode() {
		return this.darkMode.asObservable();
	}
}
