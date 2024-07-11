import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middle.js";
import { getFeed, getFollowingPosts } from "../controllers/post.controller.js";


const router=Router()

router.route("/get-feed").get(verifyJWT,getFeed)
router.route("/Following").get(verifyJWT,getFollowingPosts)

export default router