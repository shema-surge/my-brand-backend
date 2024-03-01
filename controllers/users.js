const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const users=require("../models/users")

const login=async(req,res)=>{
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
    res.render('dashusers',{user:req.user,users:allUsers})
  }catch(err){
    console.log(err)
  }
}

const renderAccount=async(req,res)=>{
  try{
    res.render("dashaccount",{user:req.user})
  }catch(err){
    console.log(err)
  }
}

module.exports={login,signup,renderUsers,renderAccount}