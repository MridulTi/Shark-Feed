import { Router } from "express";
import { getBidDetailsforUser, getMyBids } from "../controllers/bid.controller.js";
import { getComment, getLikeCount, postComment, postPost } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middle.js";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router()

// Bid Routes
router.route("/get-Bid-details").get(verifyJWT,getBidDetailsforUser)
router.route("/get-My-Bids").get(verifyJWT,getMyBids)

// Like-Comment Routes
router.route("/get-Like-Count").get(verifyJWT,getLikeCount)
router.route("/post-comment").post(verifyJWT,postComment)
router.route("/get-comment").get(verifyJWT,getComment)

// Post Routes
router.route("/post").post(verifyJWT,
    upload.fields([
        {
            name:"photo",
        },
        {
            name:"videofile"
        }
    ]),postPost)

export default router