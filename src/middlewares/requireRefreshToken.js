import jwt from "jsonwebtoken";

export const requireRefreshToken = (req,res,next) => {

    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        
        if(!refreshTokenCookie) throw Error("Token not exist")

        const decoded = jwt.verify(refreshTokenCookie, process.env.SECRET_KEY_REFRESH)

        req.id = decoded.id

        next()
    } catch (error) {
        error = error.message
        return res.status(401).json(
           { msg: error}
        )
    }

}