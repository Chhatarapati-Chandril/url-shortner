import { Url } from "../models/url.model.js";
import ApiError from "../utils/ApiError.js";

// =============================
// HELPER: Generic transformer
// =============================
const mapToSortedArray = (obj = {}, keyName, sortFn, limit) => {
    const arr = Object.entries(obj)
        .map(([key, count]) => ({ [keyName]: key, count }))
        .sort(sortFn);

    return limit ? arr.slice(0, limit) : arr;
};

// =============================
// HELPER: Format analytics
// =============================
const formatAnalytics = (analytics = {}) => {
    return {
        totalClicks: analytics.totalClicks ?? 0,

        dailyClicks: mapToSortedArray(
            analytics.dailyClicks,
            "date",
            (a, b) => a.date.localeCompare(b.date)
        ),

        deviceStats: mapToSortedArray(
            analytics.deviceStats,
            "type",
            (a, b) => b.count - a.count,
            10 // optional limit
        ),

        countryStats: mapToSortedArray(
            analytics.countryStats,
            "country",
            (a, b) => b.count - a.count,
            10 // optional limit
        )
    };
};

// =============================
// SERVICE
// =============================
export const getUrlAnalyticsService = async (shortId) => {
    const url = await Url.findOne({ shortId })
        .select("shortId redirectUrl analytics createdAt")
        .lean();

    if (!url) {
        throw new ApiError(404, "Short URL not found");
    }

    return {
        shortId: url.shortId,
        redirectUrl: url.redirectUrl,
        createdAt: url.createdAt,
        ...formatAnalytics(url.analytics)
    };
};