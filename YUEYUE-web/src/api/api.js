// api.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://8.130.67.219:88', // 基本 URL
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get = async (url, data) => {
    const response = await instance.get(url, data);
    return response.data;
};

export const post = async (url, data) => {
    const response = await instance.post(url, data);
    return response.data;
};