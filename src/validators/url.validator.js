import ApiError from "../utils/ApiError.js";

const validateCreateShortUrl = ({ redirectUrl }) => {

    if (redirectUrl === undefined) {
        throw new ApiError(400, "redirectUrl is required");
    }

    if (typeof redirectUrl !== "string") {
        throw new ApiError(400, "redirectUrl must be a string");
    }

    const cleanedUrl = redirectUrl.trim();

    if (cleanedUrl.length === 0) {
        throw new ApiError(400, "redirectUrl cannot be empty");
    }

    try {
        new URL(cleanedUrl);
    } catch (error) {
        throw new ApiError(400, "Invalid URL")
    }

    return cleanedUrl;
}

export default validateCreateShortUrl