import axios from 'axios';

const api = axios.create({
    baseURL: 'https://my-json-server.typicode.com/UPC-PRE-202502-1ASI0730-7429-CertiDev/db.json',
    headers: { 'Content-Type': 'application/json' },
});

export default api;
