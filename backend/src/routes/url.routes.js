import { Router } from "express";
import { generateNewShortUrl, getAllLinks } from "../controllers/url.controller.js";
import getUrlAnalytics from "../controllers/analytics.controller.js";

const urlRouter = Router()

urlRouter.route("/")
    .get(getAllLinks)
    .post(generateNewShortUrl)
    
urlRouter.route("/analytics/:shortId")
    .get(getUrlAnalytics)


export default urlRouter