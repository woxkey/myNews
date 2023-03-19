import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import IComment from '../../interfaces/IComment';
import {commentsApi} from '../../api/commentApi/commentsApi';
import ICommentDTO from '../../interfaces/ICommentDTO';

interface CommentState {
	value: IComment[];
	loading: boolean;
}

const initialState: CommentState = {
	value: [],
	loading: false,
};

export const getComments = createAsyncThunk(
	'getComments',
	async (queryId: string) => {
		return await commentsApi.getComments(queryId);
	}
);

export const postComment = createAsyncThunk(
	'postComment',
	async (comment: ICommentDTO) => {
		return await commentsApi.createComment(comment);
	}
);

export const deleteComment = createAsyncThunk(
	'deleteComment',
	async (id: string) => {
		return await commentsApi.deleteComment(id);
	}
);

export const commentSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getComments.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getComments.rejected, (state, action) => {
				state.loading = false;
			})
			.addCase(getComments.fulfilled, (state, action) => {
				state.loading = false;
				state.value = action.payload;
			})
			.addCase(postComment.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(postComment.rejected, (state, action) => {
				state.loading = false;
			})
			.addCase(postComment.fulfilled, (state, action) => {
				state.loading = false;
			});
	},
});

export default commentSlice.reducer;
