const posts=require("../models/posts");
const views=require("../models/views")


const getAllPosts=async(req,res)=>{
  try{
    const allPosts=await posts.find().sort({createdAt:-1});
    res.status(200).json({status:"successful",posts:allPosts})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

const getUserPosts=async(req,res)=>{
  try{
    const allPosts=await posts.find({author:req.user._id}).sort({createdAt:-1});
    res.status(200).json({status:"successful",posts:allPosts})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}


const createNewPost=async(req,res)=>{
    try{
     const {title,content}=req.body
     if(!title) return res.status(400).json({status:"failed",message:"Missing Post Title"})
     if(!content) return res.status(400).json({status:"failed",message:"Missing Post Content"})
     const post=await posts.create({title,content,author:req.user._id})
     res.status(200).json({status:"successfull",post})
    }catch(err){
      res.status(500).json({status:"failed",message:"Internal Server Error"})
      console.log(err)
    }
}

const getPost=async(req,res)=>{
  try{
    const {pid}=req.params
    const {uid}=req.body
    if(!pid) return res.status(400).json({status:"failed",message:"Missing Post id"})
    const post=await posts.findById(pid)
    if(!post) return res.status(400).json({status:"failed",message:"No such post found"})
    if(uid){    
      const view=await views.findOne({post:pid,user:uid})
      if(!view) await views.create({post:pid,user:uid})
    }
    res.json({status:"successful",post})
  }catch(err){
    console.log(err)
    res.status(500).json({status:"failed",message:"Internal Server Error"})
  }
}

const editPost=async(req,res)=>{
  try{
    const {pid}=req.params
    const {title,content}=req.body

    if(!pid) return res.status(400).json({status:"failed",message:"Missing Post id"})
    if(!title) return res.status(400).json({status:"failed",message:"Missing Post Title"})
    if(!content) return res.status(400).json({status:"failed",message:"Missing Post Content"})

    const editedPost=await posts.findByIdAndUpdate(pid,{title,content})
    res.status(200).json({status:"failed",post:editedPost})
    
  }catch(err){
    console.log(err)
    res.status(500).json({status:"failed",message:"Internal Server Error"})
  }
}

const deletePost=async(req,res)=>{
  try{
    if(!pid) return res.status(400).json({status:"failed",message:"Missing Post id"})
    const deletedPost=await posts.findByIdAndDelete(pid)
    res.json({status:"successfull",post:deletedPost})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

module.exports={getAllPosts,getUserPosts,createNewPost,deletePost,editPost,getPost}