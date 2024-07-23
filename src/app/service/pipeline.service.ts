import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreatePipelineDTO, TimelinePipeline } from '../models/pipeline.model';

@Injectable({
	providedIn: 'root',
})
export class PipelineService {
	backendUrl = environment.backendUrl;

	constructor(private httpClient: HttpClient) {}

	getPersonalTimeLinePipelines() {
		return this.httpClient
			.get<TimelinePipeline[]>(`${this.backendUrl}/pipeline`)
			.pipe(
				map(response => response), // Ensure this maps to an array of TimelinePost
				catchError(error => {
					console.error('Error fetching personal pipeline-home list', error);
					return throwError(
						() => new Error(error.message || 'An error occurred')
					);
				})
			);
	}

	getPipelineById(id: number) {
		return this.httpClient.get<TimelinePipeline>(
			`${this.backendUrl}/pipeline/${id}`
		);
	}

	runPipeline(pipelineId: number, fileInput: File | undefined = undefined) {
		const formData = new FormData();
		if (fileInput) {
			formData.append('file', fileInput);
		}
		return this.httpClient.post<void>(
			`${this.backendUrl}/pipeline/${pipelineId}/run`,
			formData
		);
	}

	createPipeline(dto: CreatePipelineDTO) {
		return this.httpClient.post<TimelinePipeline>(
			`${this.backendUrl}/pipeline`,
			dto
		);
	}

	updatePipeline(dto: Partial<CreatePipelineDTO>, pipelineId: number) {
		return this.httpClient.patch<TimelinePipeline>(
			`${this.backendUrl}/pipeline/${pipelineId}`,
			dto
		);
	}
}
