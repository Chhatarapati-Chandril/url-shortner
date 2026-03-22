export const BASE_URL = import.meta.env.VITE_API_URL;

export const API_PATHS = {
  CREATE: "/api/v1/links",
  ANALYTICS: (shortId) => `/api/v1/links/analytics/${shortId}`,
};