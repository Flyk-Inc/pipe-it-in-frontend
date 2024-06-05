export interface CursoredRessource<T> {
	data: T[];
	cursor: string;
	limit: number;
	total: number;
}
