import mongoose from "mongoose";

const bidSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    companyTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    price:{
        type:String
    },
    equityWant:{
        type:String
    },
    isAccepted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const Bid=mongoose.model("Bid",bidSchema)