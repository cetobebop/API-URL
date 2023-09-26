import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";

import { convertObjectId } from "../helpers/objectId.js";

class LinkController {



  async getLinks (req,res) {

    const {user} = req

    try {
        
    const link = await Link.find({userId: user}).lean()

    if(!link.length) return res.status(404).json({
        msg: "Link not found"
    })

    return res.status(200).json({
        link
    })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }

  }

  async getLink (req, res){

    const {id} = req.params 

    try {
        const link = await Link.findById(id).lean()

        if(!link) return res.status(404).json({
            msg: "Not found"
        })

        if(!link.userId.equals(req.user)) return res.status(403).json({
            msg: "this link isnt yours"
        })

        return res.status(200).json({
            link
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
  }

  async deleteItem (req,res) {
    const {id} = req.params 

    try {
        const link = await Link.findById(id)

        if(!link) return res.status(404).json({
            msg: "Not found"
        })

        if(!link.userId.equals(req.user)) return res.status(403).json({
            msg: "this link isnt yours"
        })

        await link.deleteOne()

        return res.status(200).json({
            link
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }

  }

  async updateItem (req,res) {
    const {id} = req.params 
    const {longLink} = req.body
    try {
        let link = await Link.findOneAndUpdate({_id: id, userId: req.user}, {longLink}, {new: true})

        if(!link) return res.status(404).json({
            msg: "Not found"
        })

        // if(!link.userId.equals(req.user)) return res.status(403).json({
        //     msg: "this link isnt yours"
        // })        

        return res.status(200).json({
            link
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }

  }


  async createLink(req, res) {
    const { longLink } = req.body;
    console.log(req.user)
    try {
        const newLink = await new Link({
            longLink,
            shortLink: nanoid(6),
            userId: req.user,
          }).save();
      
          return res.status(201).json({
            newLink,
          });
    } catch (error) {
        return res.status(500).josn({
            msg: error.message
        })
    }
  }
}

export default new LinkController();
