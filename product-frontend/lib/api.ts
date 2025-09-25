import axios from 'axios';

const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5001';
const api = axios.create({ baseURL: `${base}/api` });
export default api;
