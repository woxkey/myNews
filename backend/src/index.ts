import express, {Express, json} from 'express';
import 'dotenv/config';
import cors from 'cors';
import {mongoose} from './repository/mongoose';
import {newsRouter} from './routes/news';
import {commentRouter} from './routes/comment';

mongoose.run();

const app: Express = express();
app.use(json());
app.use(cors());
app.use(express.static('uploads'));
app.use('/news', newsRouter);
app.use('/comments', commentRouter);

app.listen(process.env.PORT, () => {
	console.log('App started on port ' + process.env.PORT);
});
