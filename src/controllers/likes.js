const posts=require("../models/posts")
const notifications=require("../models/notifications.js")
const comments=require("../models/comments.js")
const likes=require("../models/likes")

const likePost=async(req,res)=>{
    try{

      const {pid}=req.params
      if(!pid) return res.status(400).json({status:"failed",message:"Missing Post id"})

      let like=await likes.findOne({recipient:pid,user:req.user.id})
      const post=await posts.findById(pid)

      if(!post) return res.status(404).json({status:"failed",message:"No such post found"})

      await notifications.create({user:post.author,content:`User ${req.user.name} liked your  on post titled ${post.title}`})

      if(!like){
        await likes.create({recipient:pid,user:req.user._id})
        post.likes+=1
        await post.save()
      }else{
        await likes.deleteOne({recipient:pid,user:req.user._id})
        post.likes-=1
        await post.save()
      }
      
      await post.save()
      res.json({status:"successful",post})
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

      const post=await posts.findById(comment.parent)
      if(!post) return res.status(404).json({status:"failed",message:"Post associated with this comment no longer exists"})

      if(!like){
        await likes.create({recipient:cid,user:req.user._id})
        comment.likes+=1
        await comment.save()
        await notifications.create({user:comment.author,content:`User ${req.user.name} liked your comment on post titled ${post.title}`})
      }else{
        await likes.deleteOne({recipient:cid,user:req.user._id})
        if(comment.likes>0) comment.likes-=1
        await comment.save()
      }
      res.json({status:"successfull",comment})
    }catch(err){
      console.log(err)
      res.status(500).json({status:"failed",message:"Internal Server Error"})
    }
  }

module.exports={likePost,likeComment}