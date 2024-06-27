import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import mongoose from "mongoose"
import { User } from "../models/User.models.js"

const getBidDetailsforUser=asyncHandler(async(req,res)=>{
    const user=await User.aggregate([
        {   
            $match:{
                _id:new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup:{
                from:"bids",
                localField:"companyTo",
                foreignField:"_id",
                as:"bidDetails",
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
                    }
                ]
            }
        },
        
        {
            $addFields:{
                bidDetails:{
                    $first:"$bidDetails"
                },
                areBids:{
                    $cond:{
                        if:{$size:"$bidDetails">0},
                        then:true,
                        else:false
                    }
                }
            }
        }
    ])

    console.log(user[0])

    return res.status(200)
    .json(new ApiResponse(200,user[0],"Bit Details Fetched successfully"))
})

const getMyBids=asyncHandler(async(req,res)=>{
    const user=await User.aggregate([
        {   
            $match:{
                _id:new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup:{
                from:"bids",
                localField:"owner",
                foreignField:"_id",
                as:"MyBid",
                pipeline:[
                    {
                        $lookup:{
                            from:"users",
                            localField:"companyTo",
                            foreignField:"_id",
                            as:"companyTo",
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
                    }
                ]
            }
        },
        
        {
            $addFields:{
                MyBid:{
                    $first:"$MyBid"
                },
            }
        }
    ])

    console.log(user[0])

    return res.status(200)
    .json(new ApiResponse(200,user[0].MyBid,"My Bids Fetched successfully"))
})


export {
    getBidDetailsforUser,
    getMyBids
}