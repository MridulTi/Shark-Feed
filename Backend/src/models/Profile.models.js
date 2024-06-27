import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    profileType: {
        type: String,
        enum: ['Individual', 'Company'],
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    currentInvestors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Investor'
    }],
    connections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    numberOfInvestors: {
        type: Number,
        default: 0
    },
    stats: {
        // Define your stats schema here
    },
    activity: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    }],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
}, { timestamps: true });
export const Profile = mongoose.model('Profile', profileSchema);
