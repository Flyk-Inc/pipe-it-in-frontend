import { TimelinePipeline } from '../../models/pipeline.model';

export interface PipelineTimelineState {
	personalPipelines: TimelinePipeline[];
	loading: boolean;
	error: string | null;
}

export const initialState: PipelineTimelineState = {
	personalPipelines: [],
	loading: false,
	error: null,
};
