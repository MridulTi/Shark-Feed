import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
    recipient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    type:{
        type:String
    } ,
    content:{
        type:String
    },
    link:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    read: { 
        type: Boolean, 
        default: false 
    },
  },{timestamps:true});
  
export const Notification = mongoose.model('Notification', notificationSchema);