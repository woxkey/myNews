import {Box, Button, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {postNews} from '../../features/news/newsSlice';
import INewsDTO from '../../interfaces/INewsDTO';
import {useAppDispatch} from '../../store/hooks';

const AddNewPost = () => {
	const [post, setPost] = useState<INewsDTO>({
		title: '',
		description: '',
	} as INewsDTO);
	const [file, setFile] = useState<File | ''>('');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('title', post.title);
		formData.append('description', post.description);
		formData.append('image', file);
		await dispatch(postNews(formData));
		navigate('/');
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setPost({
			...post,
			[name]: value,
		});
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files !== null) {
			setFile(e.target.files[0]);
		}
	};

	return (
		<Box component={'form'} onSubmit={handleSubmit}>
			<Typography variant={'h4'} sx={{marginTop: '20px'}}>
				Add New Post
			</Typography>
			<Box
				component={'div'}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					gap: '20px',
					marginTop: '20px',
				}}
			>
				<TextField
					label="title"
					variant="outlined"
					value={post.title}
					onChange={handleInputChange}
					name="title"
					type="text"
					required
				/>
				<TextField
					label="description"
					variant="outlined"
					value={post.description}
					onChange={handleInputChange}
					name="description"
					type="text"
					required
				/>

				<Button variant="contained" component="label">
					Upload Image
					<input
						hidden
						onChange={handleFileChange}
						accept="image/*"
						type="file"
					/>
				</Button>

				<Button variant="contained" type="submit">
					Save
				</Button>
			</Box>
		</Box>
	);
};

export default AddNewPost;
