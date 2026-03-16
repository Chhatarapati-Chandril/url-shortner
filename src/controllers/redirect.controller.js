import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { Url } from "../models/url.model.js";

const redirectToOriginal = asyncHandler(async (req, res) => {
    const { shortId } = req.params

    const url = await Url.findOneAndUpdate(
        { shortId },
        {
            $inc: { clicks: 1 },
            $push: {
                visitHistory: { timestamp: new Date() }
            }
        },
        { new: true }
    )
    if (!url) {
        throw new ApiError(404, "Short URL not found");
    }

    return res
    .redirect(302, url.redirectUrl)

})

export default redirectToOriginal