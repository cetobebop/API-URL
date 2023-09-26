import jwt from "jsonwebtoken";



export const createToken =  (id) => {
    
    const expiresIn = 60 * 15;
    const token =  jwt.sign({id}, process.env.SECRET_KEY, { expiresIn })
  
    return {token, expiresIn}

}

export const generateRefreshToken = (id, res) => {

    try {
        const expiresIn = 60 * 60 * 24 

        const refreshToken = jwt.sign({id}, process.env.SECRET_KEY_REFRESH, {expiresIn})

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000)
        })
    } catch (error) {
        console.log(error)
    }


}

export const verifyToken = (req) =>{

    try {
        
        const token = req.headers.x_access_token 

        if(!token) throw Error("Token not exist")

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        

        req.user = decoded.id

        return 0

    } catch (error) {
        return error.message
    }

}

export const obtainRefreshToken = (req, res) => {

    try {
        
       

        const {token, expiresIn} = createToken(req.id)


        res.status(200).json({
            token,
            expiresIn
        })
    } catch (error) {
        error = error.message
        return res.status(401).json(
           { msg: error}
        )
    }

}