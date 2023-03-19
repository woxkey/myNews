import {ObjectId} from 'mongoose';

export default interface IComment {
	news: ObjectId;
	author?: string;
	comment: string;
}
