const users=require("../models/users")
const posts=require("../models/posts")
const comments=require("../models/comments")
const likes=require("../models/likes")

const createNewComment=async(req,res)=>{
    try{
     const {content}=req.body
     const {pid}=req.query
     if(!content || !pid) throw new Error("Missing data fields")
     await comments.create({parent:pid,author:req.user._id,content})
     let allComments=await comments.find({parent:pid})
     const promiseArray=allComments.map(async(comment)=>{
       const author=await users.findById(comment.author)
       return {...comment,author:author}
     })
     const modifiedComments=await Promise.all(promiseArray)
    await posts.findByIdAndUpdate(pid,{comments:allComments.length})
    res.json({comments:modifiedComments})
    }catch(err){
      console.log(err)
    }
}

const likeComment=async(req,res)=>{
  try{
    let like=await likes.findOne({recipient:req.query.cid,user:req.user.id})
    const comment=await comments.findById(req.query.cid)
    if(!like){
      await likes.create({recipient:req.query.cid,user:req.user._id})
      comment.likes+=1
    }else{
      await likes.deleteOne({recipient:req.query.cid,user:req.user._id})
      if(comment.likes>0) comment.likes-=1
    }
    await comment.save()
    res.json({likes:comment.likes})
  }catch(err){
    console.log(err)
  }
}

module.exports={createNewComment,likeComment}