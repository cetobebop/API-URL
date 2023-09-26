import mongoose from "mongoose";

export const convertObjectId = (stringId) => new mongoose.Types.ObjectId(stringId)