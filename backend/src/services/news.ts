import INews from '../interfaces/INews';
import NewsModel from '../models/News';

const create = async (news: INews) => {
	const post = await NewsModel.create(news);
	return post;
};

const get = async () => {
	const news: INews[] = await NewsModel.find({}, {description: 0});
	return news;
};

const getById = async (id: string) => {
	const news = await NewsModel.findById(id);
	return news;
};

const deleteById = async (id: string) => {
	await NewsModel.findByIdAndDelete(id);
};

export {create, get, getById, deleteById};
