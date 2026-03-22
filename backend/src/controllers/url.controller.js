import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import validateCreateShortUrl from "../validators/url.validator.js";
import { createShortUrl } from "../services/url.service.js";
import { Url } from "../models/url.model.js";


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

const getAllLinks = asyncHandler(async (req, res) => {
    const links = await Url.find().sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(links, "Links fetched successfully")
    );
});

export { generateNewShortUrl, getAllLinks };