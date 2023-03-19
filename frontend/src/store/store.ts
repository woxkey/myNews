import {configureStore} from '@reduxjs/toolkit';
import commentSlice from '../features/comments/commentsSlice';
import newsSlice from '../features/news/newsSlice';

export const store = configureStore({
	reducer: {
		news: newsSlice,
		comments: commentSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
