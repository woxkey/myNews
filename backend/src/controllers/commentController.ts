import IComment from '../interfaces/IComment';
import {Request, Response} from 'express';
import {create, deleteById, get, getByQueryId} from '../services/comment';
import NewsModel from '../models/News';

const createComment = async (req: Request, res: Response) => {
	try {
		if (!req.body.news.trim('') || !req.body.comment.trim('')) {
			res.status(400).json({error: 'Id and comment are required'});
			return;
		}

		if (!req.body.news.match(/^[0-9a-fA-F]{24}$/)) {
			res.json({error: 'This is not a valid id'});
			return;
		}

		const newsExists = await NewsModel.exists({_id: req.body.news});
		if (newsExists) {
			const comment: IComment = {
				news: req.body.news,
				author: req.body.author.trim('') === '' ? 'Anonymous' : req.body.author,
				comment: req.body.comment,
			};
			const responseComment = await create(comment);
			res.send(responseComment);
		} else {
			res.json({error: 'Cannot create comment since this news does not exist'});
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

const deleteComment = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		await deleteById(id);
		res.json({message: `Successfully deleted comment with id ${id}`});
	} catch (err) {
		res.status(500).send(err);
	}
};

const getComments = async (req: Request, res: Response) => {
	try {
		if (!req.query.news_id) {
			const response = await get();
			res.send(response);
			return;
		}

		if (typeof req.query.news_id === 'string') {
			const queryId = req.query.news_id;

			if (!queryId.match(/^[0-9a-fA-F]{24}$/)) {
				res.json({error: 'This is not a valid id'});
				return;
			} else {
				const response = await getByQueryId(queryId);
				res.send(response);
				return;
			}
		}

		res.json({error: 'Pass id as a string'});
	} catch (err) {
		res.status(500).send(err);
	}
};

export {createComment, deleteComment, getComments};
