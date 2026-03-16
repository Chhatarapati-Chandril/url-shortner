import mongoose, { Schema } from "mongoose"

const urlSchema = new Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        redirectUrl: {
            type: String,
            required: true
        },
        clicks: {
            type: Number,
            default: 0
        },
        visitHistory: [{
            timestamp: {
                type: Date,
                default: Date.now
            }
        }]
    },
    {
        timestamps: true
    }
)

export const Url = mongoose.model("Url", urlSchema)