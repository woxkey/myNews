import axios from 'axios';
import {baseUrl} from './baseUrl';

export const newsInstance = axios.create({
	baseURL: baseUrl,
});
