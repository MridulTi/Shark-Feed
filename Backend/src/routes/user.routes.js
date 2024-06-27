import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, getPostHistory, getUserChannelProfile, loginUser, logoutUser, registerUser, updateAccountDetails, updateUserAvatar } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middle.js";
import { getBidDetails, getBidDetailsforUser, getMyBids } from "../controllers/bid.controller.js";
import { getLikeCount } from "../controllers/post.controller.js";


const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
    ]),
    registerUser
)
router.route("/login").post(loginUser);

// secure routes
router.route("/logout").post(verifyJWT,logoutUser);

router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-Account-details").patch(verifyJWT,updateAccountDetails)
router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)
router.route("/c/:username").get(verifyJWT,getUserChannelProfile)
router.route("/history").get(verifyJWT,getPostHistory)

// Bid Routes
router.route("/get-Bid-details").get(verifyJWT,getBidDetailsforUser)
router.route("/get-My-Bids").get(verifyJWT,getMyBids)

// Like-Comment Routes
router.route("/get-Like-Count").get(verifyJWT,getLikeCount)

// router.route("/login").post(login)

export default router