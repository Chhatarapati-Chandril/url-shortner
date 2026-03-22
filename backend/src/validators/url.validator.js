import validator from "validator"
import ApiError from "../utils/ApiError.js";

const validateCreateShortUrl = ({ redirectUrl }) => {

    if (redirectUrl === undefined) {
        throw new ApiError(400, "redirectUrl is required");
    }

    if (typeof redirectUrl !== "string") {
        throw new ApiError(400, "redirectUrl must be a string");
    }

    const trimmedUrl = redirectUrl.trim();

    if (!validator.isURL(trimmedUrl, {
        protocols: ["http", "https"],
        require_protocol: true
    })) {
        throw new ApiError(400, "Invalid URL format")
    }

    return trimmedUrl;
}

export default validateCreateShortUrl