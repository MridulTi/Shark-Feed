import mongoose from "mongoose"
import { User } from "../models/User.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { Comment } from "../models/like-comment.models.js"
import { Post } from "../models/Post.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getLikeCount=asyncHandler(async(req,res)=>{
    const user=await User.aggregate([
        {
            $match:{
                _id:mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup:{
                from:"likes",
                localField:"likedWhom",
                foreignField:"_id",
                as:"likedWhom",
                pipeline:[
                    {
                        $lookup:{
                            from:"users",
                            localField:"owner",
                            foreignField:"_id",
                            as:"likes_owner"
                        }
                    },
                    {
                        $project:{
                            fullName:1,
                            username:1,
                            email:1,
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                likedCount:{
                    $size:"$likedWhom"
                }
            }
        }
    ])

    console.log(user)

    return res.status(200)
    .json(new ApiResponse(200,user[0],"Likes Count Fetched Successfully"))
})

const postComment=asyncHandler(async(req,res)=>{
    //take comment from req.body
    // save the comment
    const {description,post}=req.body
    if(!description) throw new ApiError(401 , "Description not found");
    console.log(req.user)
    const comment=await Comment.create({
        owner:req.user.username,
        description,
        post
    })

    const commentedUser=await Comment.findById(comment._id)
    res.status(201)
    .json(new ApiResponse(201,commentedUser,"Comment Created Successfully"))
})

const getComment=asyncHandler(async(req,res)=>{
    const comment=await Post.aggregate([
        {
            $match:{
                _id:mongoose.Types.ObjectId(req.post._id)
            }
        },
        {
            $lookup:{
                from:"comments",
                localField:"ownwer",
                foreignField:"_id",
                as:"comment",
                pipeline:[
                    {
                        $lookup:{
                            from:"posts",
                            localField:"commentedOn",
                            foreignField:"_id"
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                comment:{
                    $first:"$comment"
                }
            }
        }
    ])

    res.status(201)
    .json(new ApiResponse(201,comment[0],"Comment Fetched Successfully"))
})

export {
    getLikeCount,
    getComment,
    postComment
}