import ICommentDTO from '../../interfaces/ICommentDTO';
import {commentsInstance} from './instance';

class CommentsApi {
	public getComments = async (queryId: string) => {
		try {
			const response = await commentsInstance.get(`?news_id=${queryId}`);
			return response.data;
		} catch (err: unknown) {
			console.log(err);
		}
	};

	public createComment = async (comment: ICommentDTO) => {
		try {
			await commentsInstance.post('', comment);
		} catch (err: unknown) {
			console.log(err);
		}
	};
	public deleteComment = async (id: string) => {
		try {
			await commentsInstance.delete(`/${id}`);
		} catch (err: unknown) {
			console.log(err);
		}
	};
}

export const commentsApi = new CommentsApi();
