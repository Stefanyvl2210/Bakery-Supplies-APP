import axios from "axios";
import { ApiUrl } from "../helpers/url";

let unauthorizedHandler = null;
let authToken = null;

export const AUTH_TOKEN_STORAGE_KEY = "bakery_auth_token";

export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = typeof handler === "function" ? handler : null;
};

export const setAuthToken = (token) => {
  authToken = token || null;
};

export const getStoredAuthToken = () => {
  try {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const storeAuthToken = (token) => {
  setAuthToken(token);

  try {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    }
  } catch {
    // Storage can be unavailable in private/browser-restricted contexts.
  }
};

export const generateCancelToken = () => {
  const CancelToken = axios.CancelToken;
  const sourceCancelToken = CancelToken.source();

  return sourceCancelToken;
};

const instance = axios.create({
  baseURL: ApiUrl,
  headers: {
    Accept: "application/json",
  },
});

setAuthToken(getStoredAuthToken());

instance.interceptors.request.use((config) => {
  const token = authToken || getStoredAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config?.skipAuthFailureHandler
    ) {
      unauthorizedHandler?.();
    }

    return Promise.reject(error);
  }
);

export default instance;
