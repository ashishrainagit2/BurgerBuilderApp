import axios from 'axios';

const instance = axios.create({
        baseURL: 'https://burger-7c9a6.firebaseio.com/'
});

export default instance ;