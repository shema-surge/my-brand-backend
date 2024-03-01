const users=require("../models/users")
const posts=require("../models/posts")
const comments=require("../models/comments")
const likes=require("../models/likes")

const renderNewPost= async(req, res) => {
    try{
      res.render('dashnewpost',{user:req.user})
    }catch(err){
      console.log(err)
    }
}

const renderEditPost=async(req,res)=>{
  try{
    const {pid}=req.query
    const post=await posts.findById(pid)
    res.render('dasheditpost',{user:req.user,post})
  }catch(err){
    console.log(err)
  }
}

const renderPost=async(req,res)=>{
    try{
      let commentAuthors=[]
      if(!req.query.pid){
        res.sendStatus(404)
        throw new error("No Id parameter in query string")
      }
      const post=await posts.findById(req.query.pid)
      if(!post) res.sendStatus(404)
      let allComments=await comments.find({parent:post._id})
      const promiseArray=allComments.map(async(comment)=>{
        const author=await users.findById(comment.author)
        return {...comment,author:author}
      })
      const modifiedComments=await Promise.all(promiseArray)
      res.render('post',{user:req.user,post,comments:modifiedComments})
    }catch(err){
      console.log(err)
    }
}

const renderDashboardPosts=async(req, res) => {
    try {
      if(!req.loggedIn) res.redirect("/login")
      const allPosts = await posts.find();
      res.render('dashboard',{user:req.user,posts:allPosts})
    } catch (err) {
      console.log(err);
    }
}

const likePost=async(req,res)=>{
    try{
      let like=await likes.findOne({recipient:req.query.pid,user:req.user.id})
      const post=await posts.findById(req.query.pid)
      if(!like){
        await likes.create({recipient:req.query.pid,user:req.user._id})
        post.likes+=1
      }else{
        await likes.deleteOne({recipient:req.query.pid,user:req.user._id})
        if(post.likes) post.likes-=1
      }
      await post.save()
      res.json({likes:post.likes})
    }catch(err){
      console.log(err)
    }
}

const createNewPost=async(req,res)=>{
    try{
     const {title,content}=req.body
     if(!title || !content) throw new Error("Missing data fields")
     await posts.create({title,content,author:req.user.id})
     res.redirect("/dashboard")
    }catch(err){
      console.log(err)
    }
}

const editPost=async(req,res)=>{
  try{
    const {pid}=req.query
    const {title,content}=req.body
    if(!title || !content) throw new Error("Missing data fields")
    await posts.findByIdAndUpdate(pid,{title,content})
    res.redirect("/dashboard")
  }catch(err){
    console.log(err)
  }
}

const renderBlogPosts=async(req, res) => {
    try {
      const allPosts = await posts.find();
      res.render('blog',{user:req.user?req.user:null,posts:allPosts})
    } catch (err) {
      console.log(err);
    }
}

const deletePost=async(req,res)=>{
  try{
    await posts.findByIdAndDelete(req.query.pid)
    const postsData=await posts.find()
    res.json({status:"successfull",posts:postsData})
  }catch(err){
    console.log(err)
    res.json({status:"failed"})
  }
}

module.exports={renderPost,renderNewPost,renderDashboardPosts,likePost,createNewPost,renderBlogPosts,deletePost,renderEditPost,editPost}