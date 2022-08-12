import axios from 'axios';

export const generateCancelToken = () => {
  const CancelToken = axios.CancelToken;
  const sourceCancelToken = CancelToken.source();

  return sourceCancelToken
}

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://bakery-supplies.herokuapp.com/api'
      : 'http://dev.bakery-supplies.lc/api',
});

export default instance;