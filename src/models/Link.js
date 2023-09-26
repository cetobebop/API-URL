import mongoose from "mongoose";
const { Schema, model } = mongoose;


const LinkSchema = new Schema({

    longLink: {
        type: String,
        trim: true,

    },
    shortLink: {
        type: String,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:"User",
    }


})

export const Link = model("Link", LinkSchema)