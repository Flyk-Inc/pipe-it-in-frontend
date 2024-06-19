import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreatePostDto, TimelinePost } from '../models/post.model';
import { CursoredRessource } from '../models/utils';
import { map, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class SocialService {
	backendUrl = environment.backendUrl;
	newPostAdded = new Subject<TimelinePost>();

	constructor(private httpClient: HttpClient) {}

	getTimeLinePostsTest(cursor: string = ''): Observable<TimelinePost[]> {
		return this.httpClient
			.get<
				CursoredRessource<TimelinePost>
			>(`${this.backendUrl}/posts/timeline${cursor ? `?cursor=${cursor}` : ''}`)
			.pipe(
				map(response => response.data), // Ensure this maps to an array of TimelinePost
				catchError(error => {
					console.error('Error fetching timeline posts', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	createPost(postData: CreatePostDto) {
		return this.httpClient.post<TimelinePost>(
			`${this.backendUrl}/posts`,
			postData
		);
	}
}
