const express = require("express");
const path = require("node:path");
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const ejs=require('ejs')

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use("/css", express.static("public/css"));
app.use("/js", express.static("public/js"));
app.use("/images", express.static("public/images"));

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'public'))

//mongoose schemas
const users = require("./models/users");
const posts = require("./models/posts");
const comments=require("./models/comments")
const messages=require("./models/messages")

//auth middleware
const authenticateUser=require('./middleware/auth');
const { error } = require("node:console");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public/signup.html"));
});

app.get("/newPost",authenticateUser,async(req, res) => {
  try{
    if(!req.loggedIn) res.redirect('')
    res.render('dashnewpost',{user:req.user})
  }catch(err){
    console.log(err)
  }
});

app.post('/login',async(req,res)=>{
  try{

    const {email,password}=req.body
    if(!email || !password) throw new Error("Missing data fields")
    const user=await users.findOne({email:email})
    if(!user) res.send("<p>Wrong email or password, try again!</p>")
    const validPasswd=await bcrypt.compare(password,user.password)
    if(!validPasswd) res.send("<p>Wrong email or password, try again!</p>")
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:60*60})
    res.cookie("token",token)
    res.redirect('/dashboard')

  }catch(err){
    console.log(err)
  }
})

//blog

app.get('/post',async(req,res)=>{
  try{
    if(!req.loggedIn) res.redirect('/login')
    if(!req.query.pid){
      res.sendStatus(404)
      throw new error("No Id parameter in query string")
    }
    const post=await posts.findById(req.query.pid)
    if(!post) res.sendStatus(404)
    let allComments=await comments.find({parent:post._id})
    res.render('post',{user:req.user,post,comments:allComments})
  }catch(err){
    console.log(err)
  }
})

//user profile

app.get('/userProfile',authenticateUser,async(req,res)=>{
  try{
    if(!req.loggedIn) res.sendStatus(401)
    const user=await users.findById(req.user._id)
    res.send(`
    <img src="./images/${user.profileImg}" alt="" />
    <p>${user.name}</p>
    `)
  }catch(err){
    console.log(err)
  }
})

// Dashboard posts

app.get("/dashboard",authenticateUser, async (req, res) => {
  try {
    if(!req.loggedIn) res.redirect("/login")
    const allPosts = await posts.find();
    res.render('dashboard',{user:req.user,posts:allPosts})
  } catch (err) {
    console.log(err);
  }
});

// Blog posts

app.get("/blog",authenticateUser, async (req, res) => {
  try {
    const allPosts = await posts.find();
    res.render('blog',{user:req.loggedIn?req.user:null,posts:allPosts})
  } catch (err) {
    console.log(err);
  }
});

app.get('/messages',authenticateUser,async(req,res)=>{
  try{
    const allMessages=await messages.find()
    res.render('dashmessages',{user:req.user,messages:allMessages})
  }catch(err){
    console.log(err)
  }
})

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, verifyPassword } = req.body;
    if (!name || !email || !password || password !== verifyPassword) throw new Error("Missing data fields or non matching passwords");
    const salt=await bcrypt.genSalt(10)
    const hashedPasswd= await bcrypt.hash(password,salt)
    await users.create({ name, email, password:hashedPasswd })
    res.redirect('/login')
  } catch (err) {
    console.log(err);
  }
});

app.post("/newPost",authenticateUser, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) throw new Error("Missing data fields");
      await posts.create({ title, content,author:req.user._id });
      res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});

app.post("/newMessage", async (req, res) => {
  try {
    const { name,email,message } = req.body;
    if (!name || !email || !message) throw new Error("Missing data fields");
    await messages.create({ name, email,message });
  } catch (err) {
    console.log(err);
  }
});

app.post("/newComment",authenticateUser,async(req,res)=>{
  try{
   const {content}=req.body
   const {pid}=req.query
   if(!content || !pid) throw new Error("Missing data fields")
   await comments.create({parent:pid,author:req.user._id,content})
  }catch(err){
    console.log(err)
  }
})

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to Mongo");
}).catch(err=>{
  console.log(err)
});

app.listen(process.env.PORT, () => {
  console.log(`Server live on port ${process.env.PORT}`);
});
