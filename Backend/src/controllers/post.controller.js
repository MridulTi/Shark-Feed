import mongoose from "mongoose"
import { User } from "../models/User.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { Comment, Like } from "../models/like-comment.models.js"
import { Post } from "../models/Post.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { Subscription } from "../models/Subscription.models.js"
import { Notification } from "../models/Notification.js"


const sendNotification=async(recipientId,type,postId,userId)=>{
    console.log(userId,postId)
    let content;
    switch(type){
        case "subscribe":
            content=`has subscribed you.`
            break
        case "like":
            content=`has liked your post.` 
            break

        case "comment":
            content=`has commented on your post.`
            break

    }
    const notification = await Notification.create({
        recipient:recipientId,
        owner: userId,
        type,
        link:postId,
        content,
      });
}

const getLikeCount = asyncHandler(async (req, res) => {
    const { postId } = req.body
    const user = await Post.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(postId)
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "post",
                as: "likedWhom",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "likedBy",
                            foreignField: "_id",
                            as: "likes_owner"
                        }
                    },
                    {
                        $project: {
                            fullName: 1,
                            username: 1,
                            email: 1,
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                likedCount: {
                    $size: "$likedWhom"
                }
            }
        }
    ])

    console.log(user)

    return res.status(200)
        .json(new ApiResponse(200, user[0].likedCount, "Likes Count Fetched Successfully"))
})

const postLike = asyncHandler(async (req, res) => {
    const { postId, commentId } = req.body;
    console.log(postId,commentId)

    if (!(postId || commentId)) throw new ApiError(401, "Empty like Info");
    let like;
    const likedUser=await Like.findOne({likedBy: req.user._id,
        comment: commentId? commentId:undefined,
        post: postId});

    if (likedUser){
        like=await Like.deleteOne({likedBy: req.user._id,
            comment: commentId? commentId:undefined,
            post: postId})
    }else{
        like = await Like.create({
            likedBy: req.user._id,
            comment: commentId? commentId:undefined,
            post: postId
        })

        

    const user=await Post.findOne({_id:postId})
    // console.log(user.owner.toString())
    await sendNotification(user.owner,'like',postId,req.user._id);
    }
    

    res.status(201)
        .json(new ApiResponse(201, like.acknowledged?false:true, "Like Posted Successfully"))

})

const postComment = asyncHandler(async (req, res) => {
    //take comment from req.body
    // save the comment
    const { description, post } = req.body
    if (!description) throw new ApiError(401, "Description not found");
    const comment = await Comment.create({
        owner: req.user._id,
        description,
        post: post
    })
    const commentedUser = await Comment.findById(comment._id)
    const user=await Post.findOne({_id:post})
    console.log(user)

    await sendNotification(user.owner,'comment', post,req.user._id);

    res.status(201)
        .json(new ApiResponse(201, commentedUser, "Comment Created Successfully"))
})

const getComment = asyncHandler(async (req, res) => {
    const { postId } = req.body
    console.log(postId)
    const comment = await Post.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(postId)
            }
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "post",
                as: "comment",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "commentUser",
                            pipeline: [
                                {
                                    $project: {
                                        _id: 0,
                                        avatar:1,
                                        "fullName": 1,
                                        "userName": 1,
                                        "email": 1
                                    }
                                }
                            ]

                        }
                    },

                ]
            }
        },
        {
            $project: {
                _id: 0,
                comment: 1,

            }
        },

    ])
    res.status(201)
        .json(new ApiResponse(201, comment[0].comment, "Comment Fetched Successfully"))
})
const postPost = asyncHandler(async (req, res) => {
    const {
        Thumbnail,
        caption,
        tags
    } = req.body

    const photosArray = req.files?.photo;
    const videoLocalPath = req.files?.videofile

    if (!(photosArray || videoLocalPath || caption)) throw new ApiError(401, "Post Credentials missing");
    let photoPath = []

    if (photosArray) {
        await Promise.all(photosArray.map(async (filePath) => {
            let result = await uploadOnCloudinary(filePath.path)
            photoPath.push(result.url)
        }))
    }


    let videoFile = null;
    if (videoLocalPath && videoLocalPath.length > 0) {
        videoFile = await uploadOnCloudinary(videoLocalPath[0].path);
        if (!videoFile) {
            throw new ApiError(400, "Video file not found");
        }
    }

    console.log(photoPath.length)

    const post = await Post.create({
        Thumbnail: Thumbnail || photoPath[0],
        photo: photoPath,
        videofile: videoFile ? videoFile.url : null,
        owner: req.user?._id,
        caption,
        tags
    })

    const createdPost = await Post.findById(post._id)

    if (!createdPost) throw new ApiError(500, "Something went wrong while posting to database");

    return res.status(201)
        .json(new ApiResponse(200, createdPost, "Post Uploaded successfully !"))

})

const getProfileDetails = asyncHandler(async (req, res) => {
    const posts=await User.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup:{
                from:"posts",
                localField:"_id",
                foreignField:"owner",
                as:"posts"
            }
        },
        {
            $project:{
                fullName:1,
                userName:1,
                posts:1
            }
        }
    ])

    res.status(201)
        .json(new ApiResponse(201, posts, "Posts Fetched Successfully"))
})

// HOME SECTION
const getFeed = asyncHandler(async (req, res) => {

    const feed = await Post.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            userName: 1
                        }
                    },
                ]
            },
        },
        {
            $lookup: {
                from: "likes",
                let: { postId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$post", "$$postId"] },
                                    { $eq: ["$likedBy", new mongoose.Types.ObjectId(req.user._id)] }
                                ]
                            }
                        }
                    },
                    {
                        $count: "likeCount"
                    }
                ],
                as: "likes"
            }
        },
        {
            $addFields: {
                likedByCurrentUser: {
                    $cond: {
                        if: { $gt: [{ $size: "$likes" }, 0] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                likes: 0
            }
        }
        
    ])

    res.status(201)
        .json(new ApiResponse(201, feed, "Feed Fetched Successfully!"));
})


const getFollowingPosts=asyncHandler(async(req,res)=>{
    const posts=await Subscription.aggregate([
        {
            $match:{
                subscriber:new mongoose.Types.ObjectId(req.user._id)
            },

        },
        {
            $lookup:{
                from:"posts",
                localField:"channel",
                foreignField:"owner",
                as:"posted",
                pipeline:[
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        userName: 1
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            $unwind:"$posted"
        },
        {
            $sort:{
                "posted.createdAt":-1
            },
        },
        {
            $group:{
                
                _id:null,
                data:{$push:"$posted"}
            }
        },
        {
            $project:{
                data:{$slice:["$data",10]}
            }
        }

    ])

    if (!posts) throw new ApiError(404, "POSTS not found")

    res.status(201)
    .json(new ApiResponse(201,posts[0].data,"Following Posts Fetched"))
})

const getNotification=asyncHandler(async(req,res)=>{
    
    const notify=await Notification.aggregate([
        {
            $match:{
                recipient:new mongoose.Types.ObjectId(req.user._id),
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"User",
                pipeline:[
                    {
                        $project:{
                            avatar:1,
                            fullName:1,
                            userName:1
                        }
                    }
                ]
            }
        },
        {
            $sort:{
                createdAt: -1
            }
        }
    ])

    if(!notify) throw new ApiError("No Notifications found")


    res.status(201)
    .json(new ApiResponse(201,notify,"Notifications Fetched"))
})

const markNotifyRead=asyncHandler(async(req,res)=>{
    const notify=await Notification.updateMany(
        {recipient:req.user._id},
        {read:true},
    )
    if(!notify) throw new ApiError(404,"Notification Not Found");
    
    res.status(201)
    .json(new ApiResponse(201,notify,"Notification Marked."))
})


export {
    getLikeCount,
    getComment,
    postComment,
    postPost,
    postLike,
    getProfileDetails,
    getFeed,
    getFollowingPosts,
    sendNotification,
    getNotification,
    markNotifyRead

}