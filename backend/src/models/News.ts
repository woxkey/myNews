import {Schema, model} from 'mongoose';
import INews from '../interfaces/INews';

const NewsSchema: Schema = new Schema<INews>(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
	},
	{versionKey: false, timestamps: {createdAt: true, updatedAt: false}}
);

const NewsModel = model('news', NewsSchema);
export default NewsModel;
