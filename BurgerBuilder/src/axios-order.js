import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-burgerbuilder-a3ffc-default-rtdb.firebaseio.com/'
});

export default instance;