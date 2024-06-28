import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/User.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import mongoose from "mongoose"
import jwt  from "jsonwebtoken"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {
            accessToken,
            refreshToken
        }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating Refresh and Access Token");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // 1. Fill a form with all field of UserModel from FrontEnd
    // validate these details i.e. some detail is empty or not.
    // 2. Check if a username and email are unique and not already present in the DB
    // 3. Then convert password into hashed one.
    // 4. Upload avatar to cloudinary (check them before uploading)
    // 5. Create User Object - create Entry in DB
    // 6. remove password and refresh token field from response
    // 7. check for user creation
    // 8. return res

    const { fullName, userName, email, category, companyName, password } = req.body


    if ([fullName, userName, email, category, companyName, password].some((field) =>
        field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    })
    if (existedUser) throw new ApiError(409, "User with email or username already exists");

    const avatarLocalPath = req.files?.avatar[0]?.path; //path in local server not on cloudinary
    // console.log(req.files)
    if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if (!avatar) throw new ApiError(400, "Avatar not found");

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        email,
        category,
        companyName,
        password,
        userName: userName?.toLowerCase()
    })
    console.log(user)

    // Full proof idea
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) throw new ApiError(500, "Something went wrong while registering the user");

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully !")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    // Take username and password
    // Check if username exists
    // If it does exist then we check whether password is correct or not
    // then we return with 200 , (access and refresh token)-> via cookies
    const { userName, email, password } = req.body;

    if (!(userName || email)) throw new ApiError(400, "Username or email is required");

    // if([userName || email,password].some((field)=>
    //     field?.trim()==="")){
    //     throw new ApiError(400,"All fields are required")
    // }
    const userExits = await User.findOne({
        $or: [{ userName }, { email }]
    })
    if (!userExits) throw new ApiError(409, "User does not exist");
    // console.log(userExits)

    const isPasswordValid = await userExits.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(userExits._id)
    const loggedInUser = await User.findById(userExits._id).select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: true,
    }


    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged in successfully !"
            )
        )
})

const refreshAccessToken=asyncHandler(async(req,res)=>{
    const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) throw new ApiError(401,"Unauthorized Request");
    
    try {
        const decodedToken=jwt.verify(incomingRefreshToken , process.env.REFRESH_TOKEN_SECRET)
        
        const user=await User.findById(decodedToken?._id)
    
        if(!user) throw new ApiError(401,"Invalid Refresh Token");
    
        if (user?.refreshToken !==incomingRefreshToken){
            throw new ApiError(401,"Refresh Token is Expired or Used")
        }
    
        const options={
            httpOnly:true,
            secure:true
        }
    
        const {accessToken,newRefreshToken}=await generateAccessAndRefreshTokens(user._id)
    
        return res.status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(200,{
                accessToken,refreshToken:newRefreshToken
            },"Access token Refreshed")
        )
    } catch (error) {
        throw new ApiError(401,error?.message||"Invalid Refresh Token")
    }

})
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            // new updated value returned as response
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged out!"))
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) throw new ApiError(400, "Invalid old password");

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res.status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200)
        .json(200, req.user, "Current User Fetched Successfully")
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = User.findByIdAndUpdate(
        req.user?._id
        , {
            $set: {
                fullName,
                email: email
            }
        },
        { new: true }
    ).select("-password");

    return res.status(200)
    .json(new ApiResponse(200,user,"Account details updated successfully"))
})

const updateUserAvatar=asyncHandler(async(req,res)=>{
    const avatarLocalPath = req.file?.path
    if (!avatarLocalPath) throw new ApiError(400, "Avatar file is missing");

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if (!avatar) throw new ApiError(400, "Avatar not uploaded");

    const user=User.findByIdAndUpdate(req.user?._id,{
        $set:{
            avatar:avatar.url
        }
    },{new:true}).select("-password")

    return res.status(200)
    .json(new ApiResponse(200,user,"Avatar Updated"))
})

const getUserChannelProfile=asyncHandler(async(req,res)=>{
    const {username}=req.params

    if (!username?.trim()) throw new ApiError(401,"Username is missing");

    const channel = await User.aggregate([
        {
            $match:{
                userName:username?.toLowerCase()
            },
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"_id",
                foreignField:"channel",
                as:"subscribers"
            },
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"_id",
                foreignField:"subscriber",
                as:"subscribedTo"
            },
        },
        {
            $addFields:{
                subscribersCount:{
                    $size:"$subscribers"
                },
                channelsSubscribedToCount:{
                    $size:"$subscribedTo"
                },
                isSubscribed:{
                    $cond:{
                        if:{$in:[req.user?._id,"$subscribers.subscriber"]},
                        then:true,
                        else:false
                    }
                }
            }
        },
        {
            $project:{
                fullName:1,
                email:1,
                username:1,
                subscribersCount:1,
                channelsSubscribedToCount:1,
                isSubscribed:1,
                avatar:1
            }
        }
    ])

    if(!channel?.length) throw new ApiError(404,"Channel does not exists");
    console.log(channel)

    return res.status(200)
    .json(new ApiResponse(200,channel[0],"User channel fetched successfully"))
})

const getPostHistory=asyncHandler(async(req,res)=>{
    const user=await User.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup:{
                from:"posts",
                localField:"postHistory",
                foreignField:"_id",
                as:"postHistory",
                pipeline:[
                    {
                        $lookup:{
                            from:"users",
                            localField:"owner",
                            foreignField:"_id",
                            as:"owner",
                            pipeline:[
                                {
                                    $project:{
                                        fullName:1,
                                        username:1,
                                        avatar:1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields:{
                            owner:{
                                $first:"$owner"
                            }
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                postHistory:{
                    $first:"$postHistory"
                }
            }
        }
    ])

    console.log(user)

    return res.status(200)
    .json(new ApiResponse(200,user[0].postHistory,"postHistory Fetched successfully"))
})

export {
    registerUser, 
    loginUser,
    refreshAccessToken, 
    logoutUser, 
    changeCurrentPassword, 
    getCurrentUser,
    updateUserAvatar,
    updateAccountDetails,
    getUserChannelProfile,
    getPostHistory
}