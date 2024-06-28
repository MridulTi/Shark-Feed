import mongoose from "mongoose"
import { User } from "../models/User.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { Comment } from "../models/like-comment.models.js"
import { Post } from "../models/Post.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

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
    const comment=await Comment.create({
        owner:req.user._id,
        description,
        post: post
    })
    console.log(comment)
    const commentedUser=await Comment.findById(comment._id)
    res.status(201)
    .json(new ApiResponse(201,commentedUser,"Comment Created Successfully"))
})

const getComment=asyncHandler(async(req,res)=>{
    const {postId}=req.body
    const comment=await Post.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(postId)
            }
        },
        {
            $lookup:{
                from:"comments",
                localField:"_id",
                foreignField:"post",
                as:"comment",
                pipeline:[
                    {
                        $lookup:{
                            from:"users",
                            localField:"owner",
                            foreignField:"_id",
                            as:"commentUser",
                            pipeline:[
                                {
                                    $project:{
                                        _id:0,
                                        "fullName":1,
                                        "userName":1,
                                        "email":1
                                    }
                                }
                            ]

                        }
                    },
                    
                ]
            }
        },
        {
            $project:{
                _id:0,
                comment:1,
                
            }
        },
        
    ])
    res.status(201)
    .json(new ApiResponse(201,comment[0].comment,"Comment Fetched Successfully"))
})
const postPost=asyncHandler(async(req,res)=>{
    const {
        Thumbnail,
        caption,
        tags
    }=req.body

    
    const photosArray = req.files?.photo;
    const videoLocalPath = req.files?.videofile[0].path

    if (!(photosArray&&videoLocalPath && caption)) throw new ApiError(401,"Post Credentials missing");
    let photoPath=[]
    
    await Promise.all(photosArray.map(async(filePath)=>{
        let result=await uploadOnCloudinary(filePath.path)
        photoPath.push(result.url)
    }))
    
    console.log(photoPath.length)

    const videoFile = await uploadOnCloudinary(videoLocalPath)
    
    if (!videoFile) throw new ApiError(400, "Video File not found");
    const post = await Post.create({
        Thumbnail:Thumbnail||photoPath[0],
        photo:photoPath,
        videofile:videoFile.url,
        owner:req.user?._id,
        caption,
        tags
    })

    const createdPost=await Post.findById(post._id)

    if (!createdPost) throw new ApiError(500, "Something went wrong while posting to database");

    return res.status(201)
    .json(new ApiResponse(200, createdPost, "Post Uploaded successfully !"))

})

export {
    getLikeCount,
    getComment,
    postComment,
    postPost
}