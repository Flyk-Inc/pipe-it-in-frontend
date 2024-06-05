import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TimelinePost } from '../models/post.model';
import { CursoredRessource } from '../models/utils';

@Injectable({
	providedIn: 'root',
})
export class SocialService {
	backendUrl = environment.backendUrl;

	constructor(private httpClient: HttpClient) {}

	getTimeLinePosts(cursor: string = '') {
		return this.httpClient.get<CursoredRessource<TimelinePost>>(
			`${this.backendUrl}/posts/timeline${cursor ? `?cursor=${cursor}` : ''}`
		);
	}
}
