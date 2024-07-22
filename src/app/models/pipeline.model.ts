import { UserDTO } from '../auth/DTO/user.dto';
import { PipelineStep, Version } from './code.model';

export interface TimelinePipeline {
	id: number;
	title: string;
	description: string;
	user: UserDTO;
	pipelineCodes: PipelineCode[];
	runs: Run[];
	createAt: string;
	updateAt: string;
}

export interface PipelineCode {
	step: number;
	version: Version;
}

export interface Run {
	id: number;
	runReport: PipelineStep[];
	createdAt: string;
	updatedAt: string;
}
