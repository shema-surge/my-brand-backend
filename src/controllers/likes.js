const posts=require("../models/posts")
const comments=require("../models/comments.js")
const likes=require("../models/likes")

const likePost=async(req,res)=>{
    try{

      const {pid}=req.params
      if(!pid) return res.status(400).json({status:"failed",message:"Missing Post id"})

      let like=await likes.findOne({recipient:pid,user:req.user.id})
      const post=await posts.findById(pid)
      if(!post) return res.status(404).json({status:"failed",message:"No such post found"})

      const updatedPost=null
      if(!like){
        await likes.create({recipient:pid,user:req.user._id})
        updatedPost=await posts.findByIdAndUpdate(pid,{$inc:{likes:1}},{new:true})
      }else{
        await likes.deleteOne({recipient:pid,user:req.user._id})
        updatedPost=await posts.findByIdAndUpdate(pid,{$inc:{likes:-1}},{new:true})
      }
      
      await post.save()
      res.json({status:"successful",post:updatedPost})
    }catch(err){
      res.status(500).json({status:"failed",message:"Internal Server Error"})
      console.log(err)
    }
}

const likeComment=async(req,res)=>{
    try{
      const {cid}=req.params

      if(!cid) return res.status(400).json({status:"failed",message:"Missing Comment id"})
      let like=await likes.findOne({recipient:cid,user:req.user.id})

      const comment=await comments.findById(cid)
      if(!comment) return res.status(404).json({status:"failed",message:"No such comment found"})

      let updatedComment=null

      if(!like){
        await likes.create({recipient:cid,user:req.user._id})
        updatedComment=await comments.findByIdAndUpdate(cid,{$inc:{likes:1}},{new:true})
      }else{
        await likes.deleteOne({recipient:cid,user:req.user._id})
        updatedComment=await comments.findByIdAndUpdate(cid,{$inc:{likes:-1}},{new:true})
      }
      res.json({status:"successfull",comment:updatedComment})
    }catch(err){
      console.log(err)
      res.status(500).json({status:"failed",message:"Internal Server Error"})
    }
  }

module.exports={likePost,likeComment}