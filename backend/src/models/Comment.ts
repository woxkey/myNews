import {Schema, model, Types} from 'mongoose';
import IComment from '../interfaces/IComment';

const CommentSchema: Schema = new Schema<IComment>(
	{
		news: {
			type: Schema.Types.ObjectId,
			ref: 'news',
			required: true,
		},
		author: {
			type: String,
			default: 'Anonymous',
		},
		comment: {
			type: String,
			required: true,
		},
	},
	{versionKey: false}
);

const CommentModel = model('comment', CommentSchema);
export default CommentModel;
