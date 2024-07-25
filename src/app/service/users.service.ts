import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	backendUrl = environment.backendUrl;

	constructor(private http: HttpClient) {}

	searchForUsers(search: string) {
		return this.http.get(
			`${this.backendUrl}/users/search${search ? '?query=' + search : ''}`
		);
	}
}
