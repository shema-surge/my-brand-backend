const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const users=require("../models/users")

const login=async(req,res)=>{
    try{
      console.log(req.body)
      const {email,password}=req.body
      if(!email || !password) throw new Error("Missing data fields")
      const user=await users.findOne({email:email})
      if(!user) res.send("<p>Wrong email or password, try again!</p>")
      const validPasswd=await bcrypt.compare(password,user.password)
      if(!validPasswd) res.send("<p>Wrong email or password, try again!</p>")
      const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:60*60})
      res.cookie("token",token)
      res.redirect('/posts')
    }catch(err){
      console.log(err)
    }
}

const logout=(req,res)=>{
  try{
    res.cookie("token","")
    res.redirect("/blog")
  }catch(err){
    console.log(err)
  }
}

const signup=async (req, res) => {
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
}

const renderUsers=async (req,res)=>{
  try{
    const allUsers=await users.find()
    res.render('users',{user:req.user,users:allUsers})
  }catch(err){
    console.log(err)
  }
}

const renderAccount=async(req,res)=>{
  try{
    res.render("account",{user:req.user})
  }catch(err){
    console.log(err)
  }
}

const editUserInfo=async(req,res)=>{
  try{
    const {name,email}=req.body;
    if(!name || !email) throw new Error("Missing data fields")
    await users.findByIdAndUpdate(req.user._id,{name,email})
    res.redirect("/posts")
  }catch(err){
    console.log(err)
  }
}

const changeUserPasswd=async(req,res)=>{
  try{
  }catch(err){
    console.log(err)
  }
}

const getUsers=async(req,res)=>{
  try{
    const allUsers=await users.find()
    res.status(200).json({status:"successful",users:allUsers})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

const deleteUser=async(req,res)=>{
  try{
    const {uid}=req.query
    const deletedUser=await users.deleteOne({_id:cid})
    res.json({status:"successful",user:deletedUser})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

const changeUserRole=async(req,res)=>{
  try{
    const {role}=req.body
    const updatedUser=await users.findByIdAndUpdate(req.user._id,{role:role})
    res.status(200).json({status:"successful",user:updatedUser})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

const freezeUser=async(req,res)=>{
  try{
    if(req.user.status==="frozen") return res.status(400).json({status:"Bad Request",message:"User is already frozen"})
    const frozenUser=await users.findByIdAndUpdate(req.user._id,{status:"frozen"})
    res.status(200).json({status:"successful",user:frozenUser})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

const activateUser=async(req,res)=>{
  try{
    if(req.user.status==="active") return res.status(400).json({status:"Bad Request",message:"User is already active"})
    const activatedUser=await users.findByIdAndUpdate(req.user._id,{status:"active"})
    res.status(200).json({status:"successful",user:activatedUser})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

module.exports={login,signup,logout,renderUsers,renderAccount,getUsers,editUserInfo,deleteUser,changeUserPasswd,changeUserRole,freezeUser,activateUser}