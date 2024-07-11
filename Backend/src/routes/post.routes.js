import { Router } from "express";
import { acceptBids, delbids, getBidDetailsforUser, getMyBids, getPost, postBids } from "../controllers/bid.controller.js";
import { getComment, getLikeCount, postComment, postLike, postPost } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middle.js";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router()

// Bid Routes
router.route("/get-bid-details").post(verifyJWT,getBidDetailsforUser)
router.route("/get-My-Bids").get(verifyJWT,getMyBids)
router.route("/post-Bids").post(verifyJWT,postBids)
router.route("/clearBids").delete(verifyJWT,delbids)
router.route("/accept-bids").post(verifyJWT,acceptBids)

// Like-Comment Routes
router.route("/get-Like-Count").get(verifyJWT,getLikeCount)
router.route("/post-comment").post(verifyJWT,postComment)
router.route("/post-like").post(verifyJWT,postLike)
router.route("/get-comment").get(verifyJWT,getComment)

// Post Routes
router.route("/post").post(
    verifyJWT,
    upload.fields([
        { name: 'photo'},
        { name: 'videofile'}
    ]),
    postPost
);
router.route("/getPost").post(verifyJWT,getPost)


export default router