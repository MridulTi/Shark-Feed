import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const PostsSchema = new mongoose.Schema({
    Thumbnail:{
        type:String,
        required:true
    },
    photo:{
        type:[]
    },
    videofile:{
        type:String,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    caption:{
        type:String,
        required:true
    },
    isPublished:{
        type:Boolean,
        required:true
    },
    tags:[
        {
            type:String
        }
    ]
},{timestamps:true});

PostsSchema.plugin(mongooseAggregatePaginate)
export const Post = mongoose.model("Post", PostsSchema)