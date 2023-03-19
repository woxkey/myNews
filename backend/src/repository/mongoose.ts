import {connect, connection} from 'mongoose';

export const mongoose = {
	run: async () => {
		try {
			return await connect(`${process.env.MONGO_URL}/MyNews`);
		} catch (error) {
			console.log(error);
		}
	},

	stop: async () => {
		try {
			return await connection.destroy();
		} catch (error) {
			console.log(error);
		}
	},
};
