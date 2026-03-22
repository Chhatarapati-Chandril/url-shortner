export const BASE_URL = "http://localhost:8001";

export const API_PATHS = {
  CREATE: "/api/v1/links",
  ANALYTICS: (shortId) => `/api/v1/links/analytics/${shortId}`,
};