const messages=require("../models/messages")

const renderMessages= async(req,res)=>{
    try{
      const allMessages=await messages.find()
      res.status(200).render('messages',{user:req.user,messages:allMessages})
    }catch(err){
      res.status(500).json({status:"failed",message:"internal server error"})
      console.log(err)
    }
}

const createNewMessage= async (req, res) => {
    try {
      const { name,email,message } = req.body;
      if (!name || !email || !message) throw new Error("Missing data fields");
      const newMessage=await messages.create({ name, email,message });
      res.json({status:"successful",message:newMessage})
    } catch (err) {
      res.status(500).json({status:"failed",message:"internal server error"})
      console.log(err);
    }
}

const getMessages=async(req,res)=>{
  try{
    const allMessages=await messages.find({})
    res.status(200).json({status:"successful",messages:allMessages})
  }catch(err){
    res.status(500).json({status:"failed",message:"internal server error"})
    console.log(err)
  }
}

const deleteMessage=async(req,res)=>{
  try{
    const {mid}=req.query
    const deletedMessage=await messages.findByIdAndDelete(mid)
    res.status(200).json({status:"successful",message:deletedMessage})
  }catch(err){
    res.status(500).json({status:"failed",message:"internal server error"})
    console.log(err)
  }
}

module.exports={renderMessages,createNewMessage,getMessages,deleteMessage}