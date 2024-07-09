export interface UserDTO {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	username: string;
	description?: string;
	profilePicture?: string;
}
