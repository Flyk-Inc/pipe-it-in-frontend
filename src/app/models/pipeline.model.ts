import { UserDTO } from '../auth/DTO/user.dto';
import { CodeStatus, PipelineStep, Version } from './code.model';

export interface TimelinePipeline {
	id: number;
	title: string;
	description: string;
	user: UserDTO;
	pipelineCodes: PipelineCode[];
	runs: Run[];
	status: CodeStatus;
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

export interface CreatePipelineDTO {
	title: string;
	description: string;
	pipelineCodes: CreatePipelineCodeDTO[];
}

export interface CreatePipelineCodeDTO {
	code_version_id: number;
	step: number;
}
