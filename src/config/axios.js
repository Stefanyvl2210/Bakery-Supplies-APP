import axios from 'axios';

export const generateCancelToken = () => {
  const CancelToken = axios.CancelToken;
  const sourceCancelToken = CancelToken.source();

  return sourceCancelToken
}

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api/v1'
      : 'http://localhost:3002/api/v1',
});

export default instance;