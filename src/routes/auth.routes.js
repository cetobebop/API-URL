import { Router } from "express";


import authControllers from "../controllers/auth.controllers.js";
import requireTokens from "../middlewares/requireTokens.js";
import { obtainRefreshToken } from "../helpers/token.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { loginValidations, registerValidations } from "../middlewares/validationsManagers.js";

const router = Router()

router.post("/register",registerValidations, (req,res)=>{
    authControllers.register(req,res)
})
router.post("/login",loginValidations, (req,res)=>{
    authControllers.login(req,res)
})

router.post("/refresh",requireRefreshToken, (req, res)=>{
    obtainRefreshToken(req,res)
})

router.post("/protected",[requireTokens],(req,res)=>{
    res.json({
        msg: "ok"
    })
})

export default router