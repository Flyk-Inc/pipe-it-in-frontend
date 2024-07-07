import { UserDTO } from '../auth/DTO/user.dto';

export interface TimelineCode {
	id: number;
	title: string;
	description: string;
	author: UserDTO;
	language: string;
	draft: string;
	versions: Version[];
	status: string;
	createAt: string;
	updateAt: string;
}

interface FileDescription {
	fileType: string;
	description: string;
}

export interface Version {
	id: number;
	title: string;
	version: string;
	description: string;
	status: string;
	codeContent: string;
	input: FileDescription[];
	output: FileDescription[];
	createdAt: string;
	updatedAt: string;
}

export interface CreateCodeDTO {
	title: string;
	description: string;
	draft: string;
	language: CodeLanguages;
	input: InputDescriptionDTO[];
	output: OutputDescriptionDTO[];
}

export interface InputDescriptionDTO {
	fileType: string;
	description: string;
}

export interface OutputDescriptionDTO {
	fileType: string;
	description: string;
}

export enum CodeLanguages {
	python = 'python',
	javascript = 'javascript',
}
