import { Url } from "../models/url.model.js";
import ApiError from "../utils/ApiError.js";

const buildAnalyticsUpdate = ({ today, device, country }) => {
    return {
        $inc: {
            "analytics.totalClicks": 1,
            [`analytics.dailyClicks.${today}`]: 1,
            [`analytics.deviceStats.${device}`]: 1,
            [`analytics.countryStats.${country}`]: 1
        }
    };
};

export const getAndTrackUrl = async ({ shortId, now, today, device, country }) => {
    const updateQuery = buildAnalyticsUpdate({ today, device, country });

    const url = await Url.findOneAndUpdate(
        {
            shortId,
            $or: [
                { expiresAt: null },
                { expiresAt: { $gt: now } }
            ]
        },
        updateQuery,
        {
            new: false // ⚠️ important optimization
        }
    )
    .select("redirectUrl")
    .lean();

    if (!url) {
        throw new ApiError(404, "Short URL not found or expired");
    }

    return url.redirectUrl;
};