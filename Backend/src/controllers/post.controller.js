import mongoose from "mongoose"
import { User } from "../models/User.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { Comment, Like } from "../models/like-comment.models.js"
import { Post } from "../models/Post.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { Subscription } from "../models/Subscription.models.js"

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

    if (!(postId || commentId)) throw new ApiError(401, "Empty like Info");

    const like = Like.create({
        likedBy: req.user._id,
        comment: commentId,
        post: postId
    })

    res.status(201)
        .json(new ApiResponse(201, like, "Like Posted Successfully"))

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
    console.log(comment)
    const commentedUser = await Comment.findById(comment._id)
    res.status(201)
        .json(new ApiResponse(201, commentedUser, "Comment Created Successfully"))
})

const getComment = asyncHandler(async (req, res) => {
    const { postId } = req.body
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
    // const{interest}=req.body;

    // if (!interest || !Array.isArray(interest)) {
    //     throw new ApiError(400, "Interests must be provided as an array");
    // }

    // const allPosts=await Post.find();

    // const feed = allPosts.filter(post => {
    //     const tagsArray = post.tags.split(',').map(tag => tag.trim().toLowerCase());
    //     return interest.some(userInterest => tagsArray.includes(userInterest.toLowerCase()));
    // });
    // console.log(feed)
    // if (feed.length === 0) throw new ApiError(401,"No Post found that matched User's interest")

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
                    }
                ]
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

export {
    getLikeCount,
    getComment,
    postComment,
    postPost,
    postLike,
    getProfileDetails,
    getFeed,
    getFollowingPosts

}