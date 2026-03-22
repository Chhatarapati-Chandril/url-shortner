import api from "./client";
import { API_PATHS } from "../utils/constants";

export const createShortUrl = (redirectUrl) => {
  return api.post(API_PATHS.CREATE, { redirectUrl });
};

export const getAnalytics = (shortId) => {
  return api.get(API_PATHS.ANALYTICS(shortId));
};