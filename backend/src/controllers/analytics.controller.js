import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getUrlAnalyticsService } from "../services/analytics.service.js";

const getUrlAnalytics = asyncHandler(async (req, res) => {
    const { shortId } = req.params;

    const data = await getUrlAnalyticsService(shortId);

    return res.status(200).json(
        new ApiResponse(data, "Analytics fetched successfully")
    );
});

export default getUrlAnalytics;