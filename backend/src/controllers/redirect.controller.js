import asyncHandler from "../utils/asyncHandler.js";
import getRequestInfo from "../utils/requestParser.js";
import { getAndTrackUrl } from "../services/redirect.service.js";

const redirectToOriginal = asyncHandler(async (req, res) => {
    const { shortId } = req.params;

    const now = new Date();
    const today = now.toISOString().split("T")[0];

    const { device = "unknown", country = "unknown" } = getRequestInfo(req);

    const redirectUrl = await getAndTrackUrl({
        shortId,
        now,
        today,
        device,
        country
    });

    return res.redirect(302, redirectUrl);
});

export default redirectToOriginal;