import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

// const followerSchema=mongoose.Schema({
//     followerNumber:{
//         type:Number,
//         required:true,
//         default:0
//     },
//     followerUser:[
//         {
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"User"
//         }
//     ]
// })
// const Follower=mongoose.model("Follower",followerSchema);

// const followingSchema=mongoose.Schema({
//     followingNumber:{
//         type:Number,
//         required:true,
//         default:0
//     },
//     followingUser:[
//         {
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"User"
//         }
//     ]
// })
// const Following=mongoose.model("Following",followingSchema);

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    fullName: {
        type: String,
        required: true,
        trim:true,
        index:true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    avatar:{
        type:String, //Cloudinary url
        required:true
    },
    password: {
        type: String,
        required: [true,"Password is required"]
    },
    
    validated: {
        type: Boolean,
        default: false
    },
    // followers:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Follower"
    // },
    // following:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Following"
    // },
    category:{
        type:String,
        enum: ['Startup', 'Investor'],
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String
    },
    postHistory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }
}, { timestamps: true });

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=async function(){
    return await jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=async function(){
    return await jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);