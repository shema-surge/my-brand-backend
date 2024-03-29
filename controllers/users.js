const jwt=require("jsonwebtoken")
const cloudinary=require("cloudinary").v2
const bcrypt=require("bcrypt")

const users=require("../models/users")
const keys = require("../models/keys")
const {sendMail}=require("../utilities/mail")
const { NONAME } = require("dns")

//cloudinary configuration
cloudinary.config()

const login=async(req,res)=>{
    try{
      const {email,password}=req.body
      if(!email || !password) return res.status(400).json({status:"failed",message:"Missing Data Fields"})
      const user=await users.findOne({email:email})
      if(!user) return res.status(401).json({status:"failed",message:"Wrong Email or Password"})
      const validPasswd=await bcrypt.compare(password,user.password)
      if(!validPasswd) return res.status(401).json({status:"failed",message:"Wrong Email or Password"})
      const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:60*60})
      res.status(200).json({status:"successfull",token})
    }catch(err){
      console.log(err)
      res.status(500).json({status:"failed",message:"Internal Server Error"})
    }
}

const signup=async (req, res) => {
    try {
      const { name, email, password, verifyPassword } = req.body;
      if (!name || !email || !password || !verifyPassword) return res.status(400).json({status:"failed",message:"Missing Data Fields"})
      if(password !== verifyPassword) return res.status(400).json({status:"failed",message:"Passwords do not match"})
      const existingUser=await users.findOne({email:email})
      if(existingUser) return res.status(401).json({status:"failed",message:"User Account Taken"})
      const salt=await bcrypt.genSalt(10)
      const hashedPasswd= await bcrypt.hash(password,salt)
      const user=await users.create({ name, email, password:hashedPasswd })
      const activationKey=await keys.create({user:user._id,keyType:"activation"})
      console.log(activationKey)

      await sendMail(user.email,"Account Activation",`
      <html>
      <body>
      <p>click on this <a href="${req.protocol}://${req.headers.host}/users/activate/${activationKey.key}">link</a> to activate your account</p><br>
      <p>The activation link expires in 30 minutes after arrival.</p>
      </body>
      </html>
      `)

      res.status(200).json({status:"successfull",message:"Signup complete, Please Activate Your Account Via The Link Sent To Your Email"})
    } catch (err) {
      console.log(err);
      return res.status(500).json({status:"failed",message:"Internal Server Error"})
    }
}

const resendActivationLink=async(req,res)=>{
    try{
      const activationKey=await keys.create({user:req.user._id,keyType:"activation"})
      await sendMail(req.user.email,"Account Activation",`
      <html>
      <body>
      <p>click on this <a href="${req.protocol}://${req.headers.host}/users/activate/${activationKey.key}">link</a> to activate your account</p><br>
      <p>The activation link expires in 30 minutes after arrival.</p>
      </body>
      </html>
      `)
      res.status(200).json({status:"successfull",message:"Please check your email for an activation link"})
    } catch (err) {
      console.log(err);
      return res.status(500).json({status:"failed",message:"Internal Server Error"})
    }
}

const getCurrentUser=async(req,res)=>{
  try{
    res.status(200).json({status:"successfull",user:req.user})
  }catch(err){
    console.log(err)
    return res.status(500).json({status:"failed",message:"Internal Server Error"})
  }
}

const getUser=async(req,res)=>{
  try{
    const {uid}=req.params
    if(!uid) return res.status(400).json({status:"failed",message:"Bad Request"})
    const user=await users.findById(uid)
    if(!user) return res.status(404).json({status:"failed",message:"No such user found"})
    res.status(200).json({status:"successfull",user})
  }catch(err){
    console.log(err)
    return res.status(500).json({status:"failed",message:"Internal Server Error"})
  }
}

const getUsers=async (req,res)=>{
  try{
    const allUsers=await users.find()
    res.status(200).json({status:"successfull",users:allUsers})
  }catch(err){
    console.log(err)
    return res.status(500).json({status:"failed",message:"Internal Server Error"})
  }
}

const editUserInfo=async(req,res)=>{
  try{
    const {name}=req.body;
    if(!name) return res.status(400).json({status:"failed",message:"Missing Data Fields"})
    let profileImg=req.user.profileImg

    if(req.file){
      const urlParts=profileImg.split('/')
      const oldImgPublicId=urlParts[urlParts.length-1].split('.')[0]
      const cloudinaryImg=await cloudinary.uploader.upload(req.file.path)
      profileImg=cloudinaryImg.url
      await cloudinary.uploader.destroy(oldImgPublicId)
    }

    const editedUser= await users.findByIdAndUpdate(req.user._id,{name,profileImg},{new:true})
    res.status(200).json({status:"successfull",user:editedUser})
  }catch(err){
    console.log(err)
    return res.status(500).json({status:"failed",message:"Internal Server Error"})
  }
}

const changeUserPasswd=async(req,res)=>{
  try{
  }catch(err){
    console.log(err)
  }
}

const deleteUser=async(req,res)=>{
  try{
    const {uid}=req.params
    const deletedUser=await users.deleteOne(uid)
    if(!deletedUser) return res.status(404).json({status:"failed",message:"No such user"})
    res.json({status:"successful",user:deletedUser})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

const changeUserRole=async(req,res)=>{
  try{
    const {role}=req.body
    if(role!=="user" && role!=="admin") return res.status(400).json({status:"failed",message:"Invalid Role"})
    const updatedUser=await users.findByIdAndUpdate(req.user._id,{role:role},{new:true})
    res.status(200).json({status:"successful",user:updatedUser})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

const deactivateUser=async(req,res)=>{
  try{
    if(req.user.status==="inactive") return res.status(403).json({status:"failed",message:"User Is Already Inactive"})
    const deactivatedUser=await users.findByIdAndUpdate(req.user._id,{status:"inactive"},{new:true})
    res.status(200).json({status:"successful",user:deactivatedUser})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

const activateUser=async(req,res)=>{
  try{
    const {key}=req.params
    if(!key) return res.status(400).json({status:"failed",message:"Missing Activation Key"})
    const existingKey=await keys.findOne({keyType:"activation",key:key})
    if(!existingKey) return res.status(404).json({status:"failed",message:"Invalid Or Expired Activation Key"})
    const activatedUser=await users.findByIdAndUpdate(existingKey.user,{status:"active"},{new:true})
    await keys.deleteOne({keyType:"activation",key:key})
    res.status(200).json({status:"successful",user:activatedUser})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

module.exports={login,signup,getCurrentUser,getUser,getUsers,editUserInfo,deleteUser,changeUserPasswd,changeUserRole,resendActivationLink,deactivateUser,activateUser}