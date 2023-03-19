import IComment from '../interfaces/IComment';
import CommentModel from '../models/Comment';

const create = async (comment: IComment) => {
	const post = await CommentModel.create(comment);
	return post;
};

const deleteById = async (id: string) => {
	await CommentModel.findByIdAndDelete(id);
};

const get = async () => {
	const comments = await CommentModel.find({});
	return comments;
};

const getByQueryId = async (id: string) => {
	const comments = await CommentModel.find({news: id});
	return comments;
};

export {create, deleteById, get, getByQueryId};
