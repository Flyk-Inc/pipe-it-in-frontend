import { UserDTO } from '../auth/DTO/user.dto';
import { Version } from './code.model';

export interface TimelinePipeline {
	id: number;
	title: string;
	description: string;
	user: UserDTO;
	pipelineCodes: PipelineCodes[];
	createAt: string;
	updateAt: string;
}

export interface PipelineCodes {
	step: number;
	version: Version;
}
