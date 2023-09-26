import {verifyToken} from "../helpers/token.js"

export default (req,res,next) => {

    const error = verifyToken(req) 

    if(error){
        return res.status(401).json({
            error
        })
    }

    return next()

} 