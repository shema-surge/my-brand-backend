const posts=require("../models/posts")
const comments=require("../models/comments")
const users=require("../models/users")

const getPostComments=async(req,res)=>{
  try{
    const {pid}=req.params
    if(!pid) return res.status(400).json({status:"failed",message:"Missing post id"})

    const post=await posts.findById(pid)
    if(!post) return res.status(404).json({status:"failed",message:"No such post found"})

    const allPostComments=await comments.find({parent:pid}).sort({createdAt:-1})
    const promiseArray=allPostComments.map(async(comment)=>{
      const author=await users.findById(comment.author)
      return {...comment,author:author}
    })
    const modifiedComments=await Promise.all(promiseArray)
    
    res.status(200).json({status:"successfull",comments:modifiedComments})

  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

const createNewComment=async(req,res)=>{
    try{
     const {content}=req.body
     const {pid}=req.params

     if(!pid) return res.status(400).json({status:"failed",message:"Missing post id"})
     if(!content) return res.status(400).json({status:"failed",message:"Missing data fields"})

     const post=await posts.findById(pid)
     if(!post) return res.status(404).json({status:"failed",message:"No such post found"})

     const comment=await comments.create({parent:post._id,author:req.user._id,content})

      res.status(200).json({status:"successfull",comment})

    }catch(err){
      res.status(500).json({status:"failed",message:"Internal Server Error"})
      console.log(err)
    }
}

const editComment=async(req,res)=>{
  try{
    const {cid}=req.params
    const {content}=req.body
    if(!cid) return res.status(400).json({status:"failed",message:"Missing comment id"})
    if(!content) return res.status(400).json({status:"failed",message:"Missing data fields"})
    const editedComment=await comments.findByIdAndUpdate(cid,{content:content},{new:true})
    if(!editedComment) return res.status(404).json({status:"failed",message:"No such post found"})
    res.status(200).json({status:"successful",comment:editedComment})
  }catch(err){
    res.status(500).json({status:"failed"})
    console.log(err)
  }
}

const deleteComment=async(req,res)=>{
  try{
    const {cid}=req.params
    if(!cid) return res.status(400).json({status:"failed",message:"Missing comment id"})
    const deletedComment=await comments.findByIdAndDelete(cid)
    if(!deletedComment) return res.status(404).json({status:"failed",message:"No such comment found"})
    res.status(200).json({status:"successful",comment:deletedComment})
  }catch(err){
    res.status(500).json({status:"failed"})
    console.log(err)
  }
}

module.exports={getPostComments,createNewComment,editComment,deleteComment}