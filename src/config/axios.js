import axios from 'axios';
import { ApiUrl } from '../helpers/url';

export const generateCancelToken = () => {
  const CancelToken = axios.CancelToken;
  const sourceCancelToken = CancelToken.source();

  return sourceCancelToken
}

const instance = axios.create({
  baseURL: ApiUrl,
});

export default instance;
