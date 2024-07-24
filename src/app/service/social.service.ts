import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
	CreatePostDto,
	TimelinePost,
	PostComment,
	CreateCommentDTO,
} from '../models/post.model';
import { CursoredRessource } from '../models/utils';
import { map, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Group } from '../models/group.model';
import { UserDTO } from '../auth/DTO/user.dto';

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

	getPopularGroups(): Observable<Group[]> {
		return this.httpClient
			.get<Group[]>(`${this.backendUrl}/groups/popular`)
			.pipe(
				catchError(error => {
					console.error('Error fetching popular groups', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	getCurrentUserGroups(): Observable<Group[]> {
		return this.httpClient.get<Group[]>(`${this.backendUrl}/groups`).pipe(
			catchError(error => {
				console.error('Error fetching user groups', error);
				return throwError(
					() => new Error(error.message || 'An error occurred')
				);
			})
		);
	}

	getUserPosts(userId: number): Observable<TimelinePost[]> {
		return this.httpClient
			.get<
				CursoredRessource<TimelinePost>
			>(`${this.backendUrl}/posts/user/${userId}`)
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

	pinPost(postId: number): Observable<void> {
		return this.httpClient
			.patch<void>(`${this.backendUrl}/users/pin-post`, { postId })
			.pipe(
				catchError(error => {
					console.error('Error pinning post', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	unpinPost(): Observable<void> {
		return this.httpClient
			.patch<void>(`${this.backendUrl}/users/unpin-post`, {})
			.pipe(
				catchError(error => {
					console.error('Error unpinning post', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	deletePost(postId: number): Observable<void> {
		return this.httpClient
			.delete<void>(`${this.backendUrl}/posts/${postId}`)
			.pipe(
				catchError(error => {
					console.error('Error deleting post', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	updateUserProfile(profileData: Partial<UserDTO>): Observable<UserDTO> {
		return this.httpClient
			.patch<UserDTO>(`${this.backendUrl}/users/profile`, profileData)
			.pipe(
				catchError(error => {
					console.error('Error updating profile', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	uploadProfilePicture(file: File): Observable<UserDTO> {
		const formData = new FormData();
		formData.append('file', file);
		return this.httpClient
			.patch<UserDTO>(`${this.backendUrl}/files/profile-picture`, formData)
			.pipe(
				catchError(error => {
					console.error('Error uploading profile picture', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	getUserGroups(userId: number): Observable<Group[]> {
		return this.httpClient
			.get<Group[]>(`${this.backendUrl}/groups/user/${userId}`)
			.pipe(
				catchError(error => {
					console.error('Error fetching user groups', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	getUserProfile(userId: number): Observable<UserDTO> {
		return this.httpClient
			.get<UserDTO>(`${this.backendUrl}/users/${userId}`)
			.pipe(
				catchError(error => {
					console.error('Error fetching user profile', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	followUser(userId: number): Observable<void> {
		return this.httpClient
			.post<void>(`${this.backendUrl}/users/${userId}/follow`, {})
			.pipe(
				catchError(error => {
					console.error('Error following user', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	unfollowUser(userId: number): Observable<void> {
		return this.httpClient
			.post<void>(`${this.backendUrl}/users/${userId}/unfollow`, {})
			.pipe(
				catchError(error => {
					console.error('Error unfollowing user', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	sendFollowRequest(userId: number): Observable<void> {
		return this.httpClient
			.post<void>(`${this.backendUrl}/users/${userId}/follow-request`, {})
			.pipe(
				catchError(error => {
					console.error('Error sending follow request', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	acceptFollowRequest(followerId: number): Observable<void> {
		return this.httpClient
			.patch<void>(`${this.backendUrl}/users/${followerId}/follow-request`, {})
			.pipe(
				catchError(error => {
					console.error('Error accepting follow request', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	rejectFollowRequest(followerId: number): Observable<void> {
		return this.httpClient
			.delete<void>(`${this.backendUrl}/users/${followerId}/follow-request`, {})
			.pipe(
				catchError(error => {
					console.error('Error rejecting follow request', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	removeFollower(followerId: number): Observable<void> {
		return this.httpClient
			.delete<void>(`${this.backendUrl}/users/followers/${followerId}`, {})
			.pipe(
				catchError(error => {
					console.error('Error removing follower', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	getPost(postId: number): Observable<TimelinePost> {
		return this.httpClient
			.get<TimelinePost>(`${this.backendUrl}/posts/details/${postId}`)
			.pipe(
				catchError(error => {
					console.error('Error fetching post details', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	getPostComments(postId: number): Observable<PostComment[]> {
		return this.httpClient
			.get<PostComment[]>(`${this.backendUrl}/posts/${postId}/comments`)
			.pipe(
				catchError(error => {
					console.error('Error fetching post comments', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	createComment(createCommentDTO: CreateCommentDTO): Observable<PostComment> {
		return this.httpClient
			.post<PostComment>(`${this.backendUrl}/comments`, createCommentDTO)
			.pipe(
				catchError(error => {
					console.error('Error creating comment', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	replyToComment(createCommentDTO: CreateCommentDTO): Observable<PostComment> {
		return this.httpClient
			.post<PostComment>(
				`${this.backendUrl}/comments/${createCommentDTO.parentId}/reply`,
				createCommentDTO
			)
			.pipe(
				catchError(error => {
					console.error('Error creating comment', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}
}
