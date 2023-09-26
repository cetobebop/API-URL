import { Router } from "express";
import LinkController from "../controllers/link.controller.js";
import requireTokens from "../middlewares/requireTokens.js";
import { createLinkValidations, getLinkValidations, updateLinkValidations } from "../middlewares/validationsManagers.js";

const router = Router()


router.get("/link", requireTokens, (req,res)=>{
    LinkController.getLinks(req,res)
})

router.get("/:id", requireTokens, getLinkValidations, (req,res)=>{
    LinkController.getLink(req,res)
})


router.post("/link", requireTokens, createLinkValidations, (req,res)=>{
    LinkController.createLink(req,res)
})

router.delete("/:id",  requireTokens, getLinkValidations, (req,res)=>{
    LinkController.deleteItem(req,res)
})

router.patch("/:id",  requireTokens, updateLinkValidations, (req,res)=>{
    LinkController.updateItem(req,res)
})

export default router