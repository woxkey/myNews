import {Box, Button, TextField, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
	deleteComment,
	getComments,
	postComment,
} from '../../features/comments/commentsSlice';
import {getNewsById} from '../../features/news/newsSlice';
import IComment from '../../interfaces/IComment';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import '../HomePage/HomePage.css';

const ReadFullPost = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const {news} = useAppSelector((state) => state.news);
	const {value} = useAppSelector((state) => state.comments);
	const [comment, setComment] = useState({
		author: 'Anonymos',
	} as IComment);

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		await dispatch(postComment(comment));
		await dispatch(getComments(params.id || ''));
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setComment({
			...comment,
			[name]: value,
			news: params.id || '',
		});
	};

	const handleDelete = async (id: string) => {
		await dispatch(deleteComment(id));
		await dispatch(getComments(params.id || ''));
	};

	useEffect(() => {
		dispatch(getNewsById(params.id || ''));
		dispatch(getComments(params.id || ''));
	}, []);
	return (
		<Box
			component={'div'}
			sx={{display: 'flex', gap: '20px', flexDirection: 'column'}}
		>
			<img
				className="img imgRead"
				src={
					news.image && news.image !== ''
						? `${import.meta.env.VITE_BASE_URL}/${news.image}`
						: `${import.meta.env.VITE_DEFAULT_URL}`
				}
				alt={'image'}
			/>
			<Typography variant="h5">{news.title}</Typography>
			<Typography component="span">
				at {new Date(news.createdAt).toLocaleString()}
			</Typography>
			<Typography component={'p'}>{news.description}</Typography>
			<Box component={'form'} onSubmit={handleSubmit}>
				<Typography variant="h5">Add Comment</Typography>
				<Box
					component={'div'}
					sx={{margin: '20px 0', display: 'flex', gap: '15px'}}
				>
					<TextField
						label="Name:"
						variant="outlined"
						onChange={handleInputChange}
						type="text"
						name="author"
					/>

					<TextField
						label="Comment:"
						variant="outlined"
						onChange={handleInputChange}
						type="text"
						name="comment"
						required
					/>
				</Box>

				<Button size="large" variant="contained" type="submit">
					Add
				</Button>
			</Box>
			<Typography variant="h4">Comments: </Typography>
			<Box
				component={'div'}
				sx={{display: 'flex', flexDirection: 'column-reverse', gap: '20px'}}
			>
				{value.length ? (
					value.map((comment) => {
						return (
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
									gap: '10px',
									border: '1px solid black',
									padding: '20px',
								}}
								component={'div'}
								key={comment._id}
							>
								<Box>
									<Typography component={'h3'}>
										Author: {comment.author}
									</Typography>
									<Typography component={'p'}>
										Comment: {comment.comment}
									</Typography>
								</Box>
								<Button
									size="small"
									variant="outlined"
									onClick={() => handleDelete(comment._id)}
								>
									Delete
								</Button>
							</Box>
						);
					})
				) : (
					<Typography variant="h5">No comments yet. Be First!</Typography>
				)}
			</Box>
		</Box>
	);
};

export default ReadFullPost;
