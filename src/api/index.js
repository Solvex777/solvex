import axios from 'axios';
const baseURL = process.env.EXPO_PUBLIC_API_URL ?? 'https://solvex.mydb.store';

const instance = axios.create({
  baseURL,
});

// Helper to set the Authorization header
function setToken(token) {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
}

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  setToken,
};