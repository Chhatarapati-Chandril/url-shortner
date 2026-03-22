import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import validateCreateShortUrl from "../validators/url.validator.js";
import { createShortUrl } from "../services/url.service.js";

const generateNewShortUrl = asyncHandler(async (req, res) => {
    const redirectUrl = validateCreateShortUrl(req.body);

    const url = await createShortUrl(redirectUrl);

    return res.status(201).json(
        new ApiResponse(
            { shortId: url.shortId }, 
            "Short URL created successfully"
        )
    );
});

export default generateNewShortUrl