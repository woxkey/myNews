import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AddNewPost from './containers/AddNewPost/AddNewPost';
import HomePage from './containers/HomePage/HomePage';
import ReadFullPost from './containers/ReadFullPost/ReadFullPost';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="add-new-post" element={<AddNewPost />} />
					<Route path="/news/:id" element={<ReadFullPost />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
