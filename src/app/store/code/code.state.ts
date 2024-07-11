import { TimelineCode } from '../../models/code.model';

export interface CodeTimelineState {
	personalCodes: TimelineCode[];
	loading: boolean;
	error: string | null;
}

export const initialState: CodeTimelineState = {
	personalCodes: [],
	loading: false,
	error: null,
};
