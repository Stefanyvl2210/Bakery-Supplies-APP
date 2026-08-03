const withoutTrailingSlash = (url) => url.replace(/\/+$/, "");

export const BackendUrl = withoutTrailingSlash(
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"
);

export const ApiUrl = withoutTrailingSlash(
  import.meta.env.VITE_API_URL || `${BackendUrl}/api`
);
