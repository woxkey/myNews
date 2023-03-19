import axios from 'axios';
import {baseUrl} from './baseUrl';

export const commentsInstance = axios.create({
	baseURL: baseUrl,
});
