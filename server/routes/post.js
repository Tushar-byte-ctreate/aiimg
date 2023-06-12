
import express from 'express';
import * as dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'
import Post from '../mongodb/models/post.js'
dotenv.config()
// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_KEY,
    api_secret:process.env.CLOUD_SECRET
  });
  

 
  

const router = express.Router()

router.get('/',async(req,res)=>{
    try {
        const getData = await Post.find({})
        
        res.status(200).json({ success:true, data: getData})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success:false, error: error})
    }
})
 

  
router.post('/',async (req,res)=>{
  
    try {
        const {name, prompt,photo} = req.body

       
        const uploadUrl = await cloudinary.uploader.upload(photo)
        
        const newData = await Post.create({
            name: name,
            prompt:prompt,
            photo:uploadUrl.urlk
        })
        console.log(newData)
        res.status(201).json({success:true ,data:newData})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success:false, error:error})
    }



})


export default router