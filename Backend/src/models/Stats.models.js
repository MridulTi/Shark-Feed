import mongoose from "mongoose";
const statSchema = new mongoose.Schema({
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
export const Stats = mongoose.model('Stats', statSchema);
