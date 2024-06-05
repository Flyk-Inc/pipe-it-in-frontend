import { inject, Injectable } from '@angular/core';
import {
	BehaviorSubject,
	filter,
	map,
	Observable,
	of,
	switchMap,
	tap,
	withLatestFrom,
} from 'rxjs';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserDTO } from './DTO/user.dto';
import { CreateUserDTO } from './DTO/createUser.dto';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	backendUrl = environment.backendUrl;
	currentUserSource = new BehaviorSubject<UserDTO | null>(null);
	authLoadingSource = new BehaviorSubject<boolean>(true);
	tokenSource = new BehaviorSubject<string | null>(null);

	constructor(
		private http: HttpClient,
		private router: Router,
		private lstorageService: LocalStorageService
	) {
		this.loadAuthenticatedUser();
	}

	isAuthenticated(): Observable<boolean> {
		return this.authLoadingSource.pipe(
			withLatestFrom(this.currentUserSource),
			filter(([loading]) => !loading), // Only allow emissions when loading is false
			map(([, currentUser]) => {
				return currentUser !== null;
			})
		);
	}

	signInWithGooglePopup() {
		// TODO implement signInWithGooglePopup
		console.log('signInWithGooglePopup');
		return of();
	}

	signUpWithEmail(password: string, createUserDTO: CreateUserDTO) {
		const formData = {
			password,
			...createUserDTO,
		};

		return this.http.post(`${this.backendUrl}/auth/register`, formData);
	}

	logInWithEmailAndPassword(email: string, password: string) {
		const formData = {
			email,
			password,
		};
		return this.http
			.post<{ access_token: string }>(`${this.backendUrl}/auth/login`, formData)
			.pipe(
				tap(response => {
					console.log(response);
					this.setToken(response.access_token);
				}),
				switchMap(() => {
					return this.http.get<UserDTO>(`${this.backendUrl}/users/profile`);
				}),
				tap(user => {
					this.setAuthenticatedUser(user);
				})
			);
	}

	logout(): void {
		this.removeToken();
		this.removeAuthenticatedUser();
		this.router.navigate(['/auth']);
	}

	loadAuthenticatedUser() {
		this.authLoadingSource.next(true);
		const savedToken = this.getToken();
		if (savedToken == null) {
			this.authLoadingSource.next(false);
			return;
		}
		new HttpClient(inject(HttpBackend))
			.get<UserDTO>(`${this.backendUrl}/users/profile`, {
				headers: { Authorization: `Bearer ${savedToken}` },
			})
			.subscribe({
				next: user => {
					this.setAuthenticatedUser(user);
					this.authLoadingSource.next(false);
				},
				error: error => {
					console.log(error);
					this.authLoadingSource.next(false);
					this.removeToken();
					this.removeAuthenticatedUser();
				},
			});
	}

	private setToken(token: string) {
		this.tokenSource.next(token);
		this.lstorageService.setString(token, 'access_token');
	}

	private removeToken() {
		console.log('removeToken');
		this.tokenSource.next(null);
		this.lstorageService.removeString('access_token');
	}

	private getToken() {
		return this.lstorageService.getString('access_token');
	}

	private setAuthenticatedUser(user: UserDTO) {
		this.currentUserSource.next(user);
		console.log('user', user);
	}

	private removeAuthenticatedUser() {
		this.currentUserSource.next(null);
	}
}
