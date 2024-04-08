const jwt=require("jsonwebtoken")
const cloudinary=require("cloudinary").v2
const bcrypt=require("bcrypt")

const users=require("../models/users")
const keys = require("../models/keys")
const notifications=require("../models/notifications")
const {sendMail}=require("../helpers/mail")

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
      res.status(200).json({status:"successfull",user:{status:user.status,role:user.role},token})
    }catch(err){
      console.log(err)
      res.status(500).json({status:"failed",message:"Internal Server Error"})
    }
}

const signup=async (req, res) => {
    try {

      console.log("Hello")

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
      <p>Your code is: ${activationKey.code}</p><br>
      <p>Use this code to activate your account</p><br>
      <p>The code expires in 30 minutes after arrival.</p>
      </body>
      </html>
      `)

      await notifications.create({content:`New user: ${user.name} joined the blog!`})

      res.status(200).json({status:"successfull",message:"Signup complete, Please Activate Your Account Via The Code Sent To Your Email",activation:activationKey})
    } catch (err) {
      console.log(err);
      return res.status(500).json({status:"failed",message:"Internal Server Error"})
    }
}

const resendActivationCode=async(req,res)=>{
    try{
      const activationKey=await keys.create({user:req.user._id,keyType:"activation"})
      await sendMail(req.user.email,"Account Activation",`
      <html>
      <body>
      <p>Your code is: ${activationKey.code}</p><br>
      <p>Use this code to activate your account</p><br>
      <p>The code expires in 30 minutes after arrival.</p>
      </body>
      </html>
      `)
      res.status(200).json({status:"successfull",message:"Please check your email for an activation Code"})
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

const changeUserPassword=async(req,res)=>{
  try{
    const {password,newPassword,verifyPassword}=req.body
    if(!password || !newPassword || !verifyPassword) return res.status(400).json({status:"failed",message:"Missing data fields"})
    if(newPassword !== verifyPassword) return res.status(400).json({status:"failed",message:"Passwords do not match"})
    const user=await user.findById(req.user._id)
    if(!user) return res.status(404).json({status:"failed",message:"No such user found"})
    const isValidPassword=await bcrypt.compare(password,user.password)
    if(!isValidPassword) return res.status(401).json({status:"failed",message:"Invalid Password"})
    const salt=await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(newPassword,salt)
    user.password=hashedPassword
    await user.save()
    res.status(200).json({status:200,message:"Password changed successfully"})
  }catch(err){
    console.log(err)
    res.status(500).json({status:"failed",message:"Internal Server Error"})
  }
}

const sendPassworResetKey=async(req,res)=>{
  try{
    const {email}=req.body
    
    if(!email) return res.status(400).json({status:"failed",message:"Missing email data field"})
    const user=await users.findOne({email:email})
    if(!user) return res.status(404).json({status:"failed",message:`No user with email: ${email} found`})
    const passwdResetKey=await keys.create({user:user._id,keyType:"passwdReset"})
    await sendMail(user.email,"Password Reset",`
    <html>
    <body>
    <p>Your code is: ${passwdResetKey.code}</p><br>
    <p>Use this code to reset your password</p><br>
    <p>The code expires in 30 minutes after arrival.</p>
    </body>
    </html>
    `)

    console.log(passwdResetKey)
    res.status(200).json({status:"successfull",message:"Successfully sent password reset key"})

  }catch(err){
    console.log(err)
    res.status(500).json({status:"failed",message:"Internal Server Error"})
  }
}

const resetPassword=async(req,res)=>{
  try{
    const {newPassword,verifyPassword}=req.body
    const {code}=req.params

    if(!newPassword || !verifyPassword) return res.status(400).json({status:"failed",message:"Missing password data fields"})
    if(newPassword !== verifyPassword) return res.status(400).json({status:"failed",message:"Passwords do not match"})

    if(!code) return res.status(400).json({status:"failed",message:"Missing password reset code"})
    const existingkey=await keys.findOne({code:code})
    if(!existingkey) return res.status(404).json({status:"failed",message:"Invalid Key or key does't exist"})

    const user=await users.findById(existingkey.user)
    if(!user) return res.status(404).json({status:"failed",message:"No user associated with this key was found"})

    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(newPassword,salt)

    user.password=hashedPassword
    await user.save()

    await keys.findByIdAndDelete(existingkey._id)

    res.status(200).json({status:200,message:"Password reset successfully"})

  }catch(err){
    console.log(err)
    res.status(500).json({status:"failed",message:"Internal Server Error"})
  }
}

const deleteUser=async(req,res)=>{
  try{
    const {uid}=req.params
    if(!uid) return res.status(400).json({status:"failed",message:"Missing User Id"})
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
    const {uid}=req.params
    if(!uid) return res.status(400).json({status:"failed",message:"Missing uid parameter"})
    if(!role) return res.status(400).json({status:"failed",message:"No role provided"})
    if(role!=="user" && role!=="admin") return res.status(400).json({status:"failed",message:"Invalid Role"})
    const user=await users.findById(uid)
    if(!user) return res.status(404).json({status:"failed",message:"No such user found"})
    const updatedUser=await users.findByIdAndUpdate(uid,{role:role},{new:true})
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
    const {code}=req.body
    if(!code) return res.status(400).json({status:"failed",message:"Missing Activation Code"})
    const existingKey=await keys.findOne({keyType:"activation",code:parseInt(code)})
    if(!existingKey) return res.status(404).json({status:"failed",message:"Invalid Or Expired Activation Code"})
    const activatedUser=await users.findByIdAndUpdate(existingKey.user,{status:"active"},{new:true})
    await keys.deleteOne({keyType:"activation",code:parseInt(code)})
    res.status(200).json({status:"successful",user:activatedUser})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal Server Error"})
    console.log(err)
  }
}

module.exports={login,signup,getCurrentUser,getUser,getUsers,editUserInfo,deleteUser,changeUserRole,resendActivationCode,deactivateUser,activateUser,changeUserPassword,resetPassword,sendPassworResetKey}