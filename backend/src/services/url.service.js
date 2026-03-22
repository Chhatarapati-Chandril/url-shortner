import { nanoid } from "nanoid";
import { Url } from "../models/url.model.js";
import ApiError from "../utils/ApiError.js";

const MAX_RETRIES = 5;
const SHORT_ID_LENGTH = 8;

const isDuplicateKeyError = (error) => error?.code === 11000;

const generateShortId = () => nanoid(SHORT_ID_LENGTH);

const createUrlDocument = (shortId, redirectUrl) => {
    return Url.create({
        shortId,
        redirectUrl,
        isCustom: false
    });
};

export const createShortUrl = async (redirectUrl, retries = MAX_RETRIES) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        const shortId = generateShortId();

        try {
            return await createUrlDocument(shortId, redirectUrl);
        } catch (error) {
            if (!isDuplicateKeyError(error)) throw error;

            if (attempt === retries) {
                throw new ApiError(500, "Failed to generate unique short URL");
            }
        }
    }
};