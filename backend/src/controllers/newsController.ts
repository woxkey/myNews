import {Request, Response} from 'express';
import INews from '../interfaces/INews';
import CommentModel from '../models/Comment';
import {get, create, getById, deleteById} from '../services/news';

const createNews = async (req: Request, res: Response) => {
	try {
		if (!req.body.title.trim('') || !req.body.description.trim('')) {
			res.status(400).json({error: 'Title and description are required'});
			return;
		}

		const news: INews = {
			title: req.body.title,
			description: req.body.description,
			image: req.file?.filename || '',
		};
		const responseNews = await create(news);
		res.send(responseNews);
	} catch (err) {
		res.status(500).send(err);
	}
};

const getNews = async (req: Request, res: Response) => {
	try {
		const response = await get();
		res.send(response);
	} catch (err) {
		res.status(500).send(err);
	}
};

const getNewsById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		if (!id.match(/^[0-9a-fA-F]{24}$/)) {
			res.send({error: 'This is not a valid id'});
			return;
		}

		const response = await getById(id);
		const data = response ? response : {message: 'News not found'};
		res.send(data);
	} catch (err) {
		res.status(500).send(err);
	}
};

const deleteNewsById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;

		if (!id.match(/^[0-9a-fA-F]{24}$/)) {
			res.send({error: 'This is not a valid id'});
			return;
		}

		const response = await CommentModel.deleteMany({news: id});
		await deleteById(id);
		res.json({result: `Deleted ${response.deletedCount} documents`});
	} catch (err) {
		res.status(500).send(err);
	}
};

export {createNews, getNews, getNewsById, deleteNewsById};
