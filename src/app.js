import express from "express"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import whitelist from "./helpers/Whitelist.js";

import routes from "./routes/index.js"

config()

const app = express()


app.use(cors({
    origin: function (origin, callback) {
        if(whitelist.includes(origin)){
            
            
            return callback(null, origin)
        }
        return callback("Error CORS: Dominio " + origin + " no permitido")
    }
}))
app.use(express.json())
app.use(cookieParser())


app.use("/api/v1/auth", routes.authRoutes)
app.use("/api/v1/links", routes.linkRoutes)


export default app