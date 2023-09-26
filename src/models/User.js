import bcrypt from "bcrypt"
import mongoose from "mongoose";
const { Schema, model } = mongoose;



const UserSchema = new Schema ({

    email:{

        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    }



})

UserSchema.pre("save", async function (){
    
    const user = this;

    if(!user.isModified("password")) return

    try {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        
    } catch (error) {
        throw new Error("algo fallo en el hash")
    }
})


UserSchema.methods.comparePassword = async function (frontPassword){
    return await bcrypt.compare(frontPassword, this.password)  
}

export const User = model("User", UserSchema)