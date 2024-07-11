import mongoose from "mongoose";

const InvestorSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    companyTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    shares:{
        type:String
    }
},{timestamps:true})

export const Investor=mongoose.model("Bid",InvestorSchema)