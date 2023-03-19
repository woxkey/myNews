import express from 'express';
import {
	createNews,
	deleteNewsById,
	getNews,
	getNewsById,
} from '../controllers/newsController';
import multer from 'multer';

const upload = multer({dest: 'uploads'});

const router = express.Router();

router.get('/', getNews);
router.get('/:id', getNewsById);
router.post('/', upload.single('image'), createNews);
router.delete('/:id', deleteNewsById);

export {router as newsRouter};
