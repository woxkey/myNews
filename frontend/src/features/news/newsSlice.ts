import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import INews from '../../interfaces/INews';
import {newsApi} from '../../api/newsApi/newsApi';

interface NewsState {
	value: INews[];
	loading: boolean;
	news: INews;
}

export const getNews = createAsyncThunk('getNews', async () => {
	return await newsApi.getNews();
});

export const postNews = createAsyncThunk('postNews', async (news: FormData) => {
	return await newsApi.createNews(news);
});

export const deleteNews = createAsyncThunk('deleteNews', async (id: string) => {
	return await newsApi.deleteNews(id);
});

export const getNewsById = createAsyncThunk(
	'getNewsById',
	async (id: string) => {
		return await newsApi.getNewsById(id);
	}
);

const initialState: NewsState = {
	value: [],
	loading: false,
	news: {} as INews,
};

export const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getNews.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getNews.rejected, (state, action) => {
				state.loading = false;
			})
			.addCase(getNews.fulfilled, (state, action) => {
				state.loading = false;
				state.value = action.payload;
			})
			.addCase(postNews.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(postNews.rejected, (state, action) => {
				state.loading = false;
			})
			.addCase(postNews.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(deleteNews.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(deleteNews.rejected, (state, action) => {
				state.loading = false;
			})
			.addCase(deleteNews.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(getNewsById.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getNewsById.rejected, (state, action) => {
				state.loading = false;
			})
			.addCase(getNewsById.fulfilled, (state, action) => {
				state.loading = false;
				state.news = action.payload;
			});
	},
});

export default newsSlice.reducer;
