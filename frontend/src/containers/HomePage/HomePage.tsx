import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Box} from '@mui/system';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {deleteNews, getNews} from '../../features/news/newsSlice';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import './HomePage.css';

const HomePage = () => {
	const dispatch = useAppDispatch();
	const {value} = useAppSelector((state) => state.news);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getNews());
	}, [dispatch]);

	const handleDelete = async (id: string) => {
		await dispatch(deleteNews(id));
		await dispatch(getNews());
	};

	return (
		<>
			<Box
				component={'div'}
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					padding: '20px 0',
				}}
			>
				<Typography variant="h4">Posts:</Typography>
				<Button onClick={() => navigate('/add-new-post')} variant="contained">
					Add new Post
				</Button>
			</Box>
			<Box
				component={'div'}
				sx={{display: 'flex', flexDirection: 'column-reverse', gap: '20px'}}
			>
				{value.length ? (
					value.map((news) => {
						return (
							<Box
								component={'div'}
								sx={{
									border: '1px solid black',
									padding: '10px 20px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'flex-start',
									gap: '40px',
								}}
								key={news._id}
							>
								<img
									className="img"
									src={
										news.image !== ''
											? `${import.meta.env.VITE_BASE_URL}/${news.image}`
											: `${import.meta.env.VITE_DEFAULT_URL}`
									}
									alt={'image'}
								/>
								<Box
									component={'div'}
									sx={{display: 'flex', gap: '10px', flexDirection: 'column'}}
								>
									<Box component={'div'}>
										<Typography sx={{marginBottom: '10px'}} variant="h5">
											{news.title}
										</Typography>
										<Box component={'div'} sx={{display: 'flex', gap: '20px'}}>
											<Button
												variant="contained"
												size="small"
												onClick={() => navigate(`/news/${news._id}`)}
											>
												Read Full Post
											</Button>
											<Button
												variant="contained"
												size="small"
												onClick={() => handleDelete(news._id)}
											>
												Delete
											</Button>
										</Box>
									</Box>
									<Box component={'span'}>
										At {new Date(news.createdAt).toLocaleString()}
									</Box>
								</Box>
							</Box>
						);
					})
				) : (
					<Typography variant="h5">No Posts yet. Be First!</Typography>
				)}
			</Box>
		</>
	);
};

export default HomePage;
