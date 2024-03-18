const users=require("../models/users")
const posts=require("../models/posts")
const comments=require("../models/comments")
const likes=require("../models/likes")
const { checkViews } = require("./views")

const renderNewPost= async(req, res) => {
    try{
      res.render('newpost',{user:req.user})
    }catch(err){
      res.status(500).json({status:"failed",message:"Internal Server Error"})
      console.log(err)
    }
}

const renderEditPost=async(req,res)=>{
  try{
    const {pid}=req.query
    if(!pid) return res.status(400).json({status:"failed",message:"Missing Post id"})
    const post=await posts.findById(pid)
    res.render('editpost',{user:req.user,post})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

const renderPost=async(req,res)=>{
    try{
      let commentAuthors=[]
      const {pid}=req.query
      if(!pid) return res.status(400).json({status:"failed",message:"Missing Post id"})
      const post=await posts.findById(req.query.pid)
      if(!post) res.status(404).json({status:"failed",message:"Post Not Found"})
      if(req.user) checkViews(post._id,req.user._id)
      let allComments=await comments.find({parent:post._id})
      const promiseArray=allComments.map(async(comment)=>{
        const author=await users.findById(comment.author)
        return {...comment,author:author}
      })
      const modifiedComments=await Promise.all(promiseArray)
      res.render('post',{user:req.user,post,comments:modifiedComments})
    }catch(err){
      res.status(500).json({status:"failed",message:"Internal Server Error"})
      console.log(err)
    }
}

const renderPosts=async(req, res) => {
    try {
      const allPosts = await posts.find({author:req.user._id});
      res.render('posts',{user:req.user,posts:allPosts})
    } catch (err) {
      res.status(500).json({status:"failed",message:"Internal Server Error"})
      console.log(err);
    }
}

const renderBlogPosts=async(req, res) => {
  try {
    const allPosts = await posts.find();
    res.render('blog',{user:req.user?req.user:null,posts:allPosts})
  } catch (err) {
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err);
  }
}

const getPosts=async(req,res)=>{
  try{
    const allPosts=await posts.find();
    res.status(200).json({status:"successful",posts:allPosts})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

const likePost=async(req,res)=>{
    try{
      const {pid}=req.query
      if(!pid) return res.status(400).json({status:"failed",message:"Missing Post id"})

      let like=await likes.findOne({recipient:pid,user:req.user.id})
      const post=await posts.findById(pid)
      if(!like){
        await likes.create({recipient:pid,user:req.user._id})
        post.likes+=1
      }else{
        await likes.deleteOne({recipient:pid,user:req.user._id})
        if(post.likes) post.likes-=1
      }
      await post.save()
      res.json({status:"successful",likes:post.likes})
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
     await posts.create({title,content,author:req.user.id})
     res.status(200).redirect("/posts")
    }catch(err){
      res.status(500).json({status:"failed",message:"Internal Server Error"})
      console.log(err)
    }
}

const getPost=async(req,res)=>{
  try{
    const {pid}=req.query
    if(!pid) return res.status(400).json({status:"failed",message:"Missing Post id"})
    const post=await posts.findById(pid)
    res.json({status:"successful",post})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

const editPost=async(req,res)=>{
  try{
    const {pid}=req.query
    const {title,content}=req.body

    if(!pid) return res.status(400).json({status:"failed",message:"Missing Post id"})
    if(!title) return res.status(400).json({status:"failed",message:"Missing Post Title"})
    if(!content) return res.status(400).json({status:"failed",message:"Missing Post Content"})

    await posts.findByIdAndUpdate(pid,{title,content})
    res.redirect("/posts")
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

const deletePost=async(req,res)=>{
  try{
    const deletedPost=await posts.findByIdAndDelete(req.query.pid)
    res.json({status:"successfull",post:deletedPost})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

module.exports={renderPost,renderNewPost,renderPosts,getPosts,likePost,createNewPost,renderBlogPosts,deletePost,renderEditPost,editPost,getPost}