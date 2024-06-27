import mongoose from "mongoose";

const companySchema=new mongoose.Schema({
    ownedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    investedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    yearlyEval:{
        type:Number,
        required:true
    },
    companybegin:{
        type:Date,
        required:true
    },
    attritionRate:{
        type:Number
    },
    lifeTimeValue:{
        type:Number
    },
    SaleLast12m:{
        type:String
    },
    conversionRate:{
        type:String
    },
    demand:{
        type:String
    }
},{timestamps:true})

export const Company=mongoose.model("Company",companySchema)