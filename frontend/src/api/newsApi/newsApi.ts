import {newsInstance} from './instance';

class NewsApi {
	public getNews = async () => {
		try {
			const response = await newsInstance.get('');
			return response.data;
		} catch (err: unknown) {
			console.log(err);
		}
	};
	public createNews = async (news: FormData) => {
		try {
			await newsInstance.post('', news);
		} catch (err: unknown) {
			console.log(err);
		}
	};
	public deleteNews = async (id: string) => {
		try {
			await newsInstance.delete(`/${id}`);
		} catch (err: unknown) {
			console.log(err);
		}
	};
	public getNewsById = async (id: string) => {
		try {
			const response = await newsInstance.get(`/${id}`);
			return response.data;
		} catch (err) {
			console.log(err);
		}
	};
}

export const newsApi = new NewsApi();
