import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js"
import { nanoid } from "nanoid";
import { Url } from "../models/url.model.js"
import validateCreateShortUrl from "../validators/url.validator.js";


const generateUniqueShortId = async (redirectUrl, maxRetries = 5) => {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        const shortId = nanoid(8)
        try {
            await Url.create({
                shortId, 
                redirectUrl
            })
            // success
            return shortId

        } catch (error) {
            if (error.code === 11000) {
                continue;
            }
            throw new ApiError(500 ,"Database error while creating short URL")
        }
    }
    throw new ApiError(500, "Failed to generate unique short URL");
}


const generateNewShortUrl = asyncHandler(async (req, res) => {

    console.log(req.body);

    if (!req.body) {
        throw new ApiError(400, "req.body is empty");
    }

    const redirectUrl = validateCreateShortUrl(req.body)

    const shortId = await generateUniqueShortId(redirectUrl)

    return res
    .status(201)
    .json(
        new ApiResponse( 
            { id: shortId },
            "Short ID created successfully"
        )
    )
})



export default generateNewShortUrl