import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import { Url } from "../models/url.model.js";

const getUrlAnalytics = asyncHandler(async (req, res) => {
    const { shortId } = req.params

    const url = await Url.findOne({ shortId }).select(
        "shortId redirectUrl clicks visitHistory createdAt"
    )
    if (!url) {
        throw new ApiError(404, "Short URL not found");
    }

    return res
    .status(200).json(
        new ApiResponse(
            {
                shortId: url.shortId,
                redirectUrl: url.redirectUrl,
                clicks: url.clicks,
                visitHistory: url.visitHistory,
                createdAt: url.createdAt
            },
            "Analytics fetched successfully"
        )
    )
})

export default getUrlAnalytics