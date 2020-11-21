import axios from 'axios';

const api = axios.create({
  baseURL: "https://bhe-api.herokuapp.com",
  timeout: 5 * 60 * 1000
});

export default api