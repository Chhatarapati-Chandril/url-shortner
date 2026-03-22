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
            required: true,
            index: true
        },

        analytics: {
            totalClicks: {
                type: Number,
                default: 0
            },
            dailyClicks: {
                type: Map,
                of: Number,
                default: {}
            },
            deviceStats: {
                type: Map,
                of: Number,
                default: {}
            },
            countryStats: {
                type: Map,
                of: Number,
                default: {}
            }
        },

        expiresAt: {
            type: Date,
            default: null
        },

        isCustom: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

export const Url = mongoose.model("Url", urlSchema)