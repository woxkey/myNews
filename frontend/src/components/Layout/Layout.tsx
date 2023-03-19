import React from 'react';
import {Outlet} from 'react-router-dom';
import {Container} from '@mui/material';
import Typography from '@mui/material/Typography';

const Layout = () => {
	return (
		<Container maxWidth="md">
			<Typography sx={{borderBottom: '1px solid black'}} variant="h6">
				News
			</Typography>
			<Outlet />
		</Container>
	);
};

export default Layout;
