import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
	CodeDetail,
	CreateCodeDTO,
	CreateVersionDTO,
	RunTestCodeDTO,
	TestRun,
	TimelineCode,
} from '../models/code.model';

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

	runTestCode(
		codeId: number,
		runTestCodeDTO: RunTestCodeDTO,
		fileInput: File | undefined = undefined
	) {
		const formData = new FormData();
		formData.append('codeContent', runTestCodeDTO.codeContent);
		formData.append('language', runTestCodeDTO.language);
		if (fileInput) {
			formData.append('file', fileInput);
		}
		return this.httpClient.post(
			`${this.backendUrl}/codes/${codeId}/test`,
			formData
		);
	}

	getTestRuns(codeId: number) {
		return this.httpClient.get<TestRun[]>(
			`${this.backendUrl}/codes/${codeId}/testRuns`
		);
	}
}
