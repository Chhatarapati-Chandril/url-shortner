import { Router } from "express";
import redirectToOriginal from "../controllers/redirect.controller.js";

const redirectRouter = Router()

redirectRouter.route("/:shortId").get(redirectToOriginal)

export default redirectRouter