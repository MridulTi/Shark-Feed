import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import mongoose from "mongoose"
import { User } from "../models/User.models.js"
import { Bid } from "../models/Bid.models.js"
import { Post } from "../models/Post.models.js"
import { Investor } from "../models/Investor.models.js"

const getBidDetailsforUser=asyncHandler(async(req,res)=>{
    const {userId}=req.body
    const user=await User.aggregate([
        {   
            $match:{
                _id:new mongoose.Types.ObjectId(userId?userId:req.user._id)
            }
        },
        {
            $lookup: {
              from: "bids",
              localField: "_id",
              foreignField: "companyTo",
              as: "bidDetails",
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
                                userName:1
                            }
                        }
                    ]
                  }
                },
                {
                  $project:{
                    owner:1,

                    price:1,
                    equityWant:1
                  }
                }
              ]
            }
        }
    ])

    // console.log(user[0])

    return res.status(200)
    .json(new ApiResponse(200,user[0].bidDetails,"Bit Details Fetched successfully"))
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

const postBids=asyncHandler(async(req,res)=>{
    const{companyId,price, equityWant}=req.body;
    let bid;

    if (!(price && equityWant)) throw new ApiError(401, "Price or equity not mentioned");
    
    const user =await Bid.findOne({'companyTo':companyId,'owner':req.user._id});

    if(user){
        bid=await Bid.findOneAndUpdate({'owner':req.user._id,
            'companyTo':companyId},{'price':price,
                'equityWant':equityWant})
    }else{
        bid=await Bid.create({
            owner:req.user._id,
            companyTo:companyId,
            price,
            equityWant
        })
    }
    

    // console.log(bid)
    res.status(201)
    .json(new ApiResponse(201,bid,"Bid created"))
})

const getPost=asyncHandler(async(req,res)=>{
    const{postId}=req.body;

    const post=await Post.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(postId)
            }
        },
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

    if(!post) throw new ApiError(404,"Post Not Found")

    res.status(201)
    .json(new ApiResponse(201,post[0],"Post for the postId Fetched"))
})

const delbids=asyncHandler(async(req,res)=>{
    const user=await Bid.deleteMany({'companyTo':req.user._id});

    if(!user) throw new ApiError(401,"no user found")

    res.status(201)
    .json(new ApiResponse(201,user,"Bids for this account are cleared"))
})

const acceptBids=asyncHandler(async(req,res)=>{
    const {userId}=req.body

    if(!userId) throw new ApiError(404,"UserId not specified");

    const share=await Bid.find({owner:userId,companyTo:req.user._id}).select('equityWant')
    console.log(share[0])
    const Invest=await Investor.create({
        owner:userId,
        companyTo:req.user._id,
        shares:share[0].equityWant
    })

    if (!Invest) throw new ApiError(404, "Investor data couldn't be saved");

    const set=await Bid.findOneAndUpdate({owner:userId,companyTo:req.user._id},{isAccepted:true})
    res.status(201)
    .json(new ApiResponse(201,set,"Investor data saved"))
})

export {
    getBidDetailsforUser,
    getMyBids,
    postBids,
    getPost,
    delbids,
    acceptBids
}