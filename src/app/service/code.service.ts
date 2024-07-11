import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
	CreateCodeDTO,
	CreateVersionDTO,
	TimelineCode,
} from '../models/code.model';
import { CodeDetail } from '../pages/pipelines/pipelines.component';

@Injectable({
	providedIn: 'root',
})
export class CodeService {
	backendUrl = environment.backendUrl;

	constructor(private httpClient: HttpClient) {}

	getTimeLineCodes() {
		return this.httpClient.get<TimelineCode[]>(`${this.backendUrl}/codes`).pipe(
			map(response => response), // Ensure this maps to an array of TimelinePost
			catchError(error => {
				console.error('Error fetching personal code-home list', error);
				return throwError(
					() => new Error(error.message || 'An error occurred')
				);
			})
		);
	}

	getCodeDetailById(codeId: number): Observable<CodeDetail> {
		return this.httpClient
			.get<CodeDetail>(`${this.backendUrl}/codes/${codeId}`)
			.pipe(
				map(response => response), // Ensure this maps to a CodeDetail
				catchError(error => {
					console.error('Error fetching code-home detail', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	createCode(createCodeDTO: CreateCodeDTO) {
		return this.httpClient.post<TimelineCode>(
			`${this.backendUrl}/codes`,
			createCodeDTO
		);
	}

	updateCode(codeId: number, updateCodeDTO: CreateCodeDTO) {
		return this.httpClient.patch<TimelineCode>(
			`${this.backendUrl}/codes/${codeId}`,
			updateCodeDTO
		);
	}

	createVersion(createVersionDto: CreateVersionDTO, codeId: number) {
		return this.httpClient.post<TimelineCode>(
			`${this.backendUrl}/codes/${codeId}/version`,
			createVersionDto
		);
	}
}
