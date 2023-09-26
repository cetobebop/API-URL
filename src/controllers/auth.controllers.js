import _ from 'lodash'; 

import { User } from "../models/User.js"
import { createToken, generateRefreshToken } from "../helpers/token.js"

class AuthControllers {


    async register (req,res){

        try {
            const {email, password} = req.body

            const errors = await this.validations(req)

            if(errors.length) return res.status(400).json({
                errors
            })


            const user = await new User({email, password}).save()
            const newUser = _.omit(user, ["password"])

            const {token, expiresIn} = createToken(user._id)

            generateRefreshToken(user._id, res)
            
            return res.status(201).json({
                newUser,
                token,
                expiresIn
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({msg: "something went wrong"})
        }


    }

    async login (req, res){

        const {email, password} = req.body


        const errors = await this.validations(req)

        if(errors.length) return res.status(400).json({
            errors
        })

        
        const user = await User.findOne({email})
        const isThePassword = await user.comparePassword(password);

        if(!isThePassword){
            return res.status(400).json({
                msg: "invalid credentials"
            })
        }
        
        generateRefreshToken(user._id, res)
     
        return res.json({msg: "ok"})

    }


    async userExist (req){
        
        const {email} = req.body
        const error = []

        const user = await User.findOne({email}).lean()


        if(user && req.url === "/register"){
            error.push({
                field: "email",
                msg: "email already exist"
            })
        }
        else if(!user && req.url === "/login"){
            error.push({
                field: "email",
                msg: "email not exist"
            })
        }

        return error
    }

    async validations(req){
        const errors = []
        const {password, email} = req.body


        const exist = await this.userExist(req)

        if(exist.length){
            errors.push(exist[0])
        }

        return errors
    }

    

}


export default new AuthControllers