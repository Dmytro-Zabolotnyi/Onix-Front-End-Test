import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://onix-test-sandbox.getsandbox.com',
});

export default axiosInstance;
