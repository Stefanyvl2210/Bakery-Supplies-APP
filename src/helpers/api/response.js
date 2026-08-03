export const getResponseBody = (response) => response?.data ?? response ?? {};

export const getResourceData = (response) => {
  const body = getResponseBody(response);

  return body?.data ?? body;
};

export const getResourceCollection = (response) => {
  const data = getResourceData(response);

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
};

export const getPaginationMeta = (response) => {
  const body = getResponseBody(response);

  return body?.meta ?? body?.data?.meta ?? null;
};

export const getErrorMessage = (
  error,
  fallback = "There has been an error. Please try again."
) => {
  const data = error?.response?.data;

  if (typeof data?.message === "string") {
    return data.message;
  }

  if (typeof data?.Error === "string") {
    return data.Error;
  }

  const firstError = data?.errors && Object.values(data.errors)?.[0]?.[0];

  return firstError || error?.message || fallback;
};
