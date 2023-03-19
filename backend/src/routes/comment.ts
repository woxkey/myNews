import express from 'express';
import {
	createComment,
	deleteComment,
	getComments,
} from '../controllers/commentController';

const router = express.Router();

router.post('/', createComment);
router.get('/', getComments);
router.delete('/:id', deleteComment);

export {router as commentRouter};
