const messages=require("../models/messages");
const notifications=require("../models/notifications")
const {sendMail}=require("../helpers/mail")

const createNewMessage= async (req, res) => {
    try {
      const { name,email,subject,message } = req.body;
      if (!name || !email || !subject || !message) return res.status(400).json({status:"failed",message:"Missing data fields"})
      const newMessage=await messages.create({ name,email,subject,message });
      await notifications.create({content:`New message from email: ${newMessage.email},subject: ${newMessage.subject}`})
      res.status(200).json({status:"successful",message:newMessage})
    } catch (err) {
      res.status(500).json({status:"failed",message:"Internal server error"})
      console.log(err);
    }
}

const getMessage=async(req,res)=>{
  try{
    const {mid}=req.params
    if(!mid) return res.status(400).json({status:"failed",message:"Missing message id"})
    const message=await messages.findById(mid)
    if(!message) return res.status(404).json({status:"failed",message:"No such message found"})
    message.read=true
    await message.save()
    res.status(200).json({status:"successful",message})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal server error"})
    console.log(err)
  }
}

const getUnreadMessages=async(req,res)=>{
  try{
    const allUnreadMessages=await messages.find({read:false}).sort({createdAt:-1})
    res.status(200).json({status:"successful",messages:allUnreadMessages})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal server error"})
    console.log(err)
  }
}

const getMessages=async(req,res)=>{
  try{
    const allMessages=await messages.find({}).sort({createdAt:-1})
    res.status(200).json({status:"successful",messages:allMessages})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal server error"})
    console.log(err)
  }
}

const replyToMessage=async(req,res)=>{
  try{
    const {mid}=req.params
    const {reply}=req.body
    if(!mid) return res.status(400).json({status:"failed",message:"Missing message id"})
    const message=await messages.findById(mid)
    if(!message) res.status(404).json({status:"failed",message:"No such message found"})
    const result=await sendMail(message.email,`Reply To Message with subject"${message.subject}"`,`
    <html>
    <body>
    ${reply}
    </body>
    </html>
    `)
    res.status(200).json({status:"successfull",message:"Replied Successfully",result})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal server error"})
    console.log(err)
  }
}

const deleteMessage=async(req,res)=>{
  try{
    console.log("hello")
    const {mid}=req.params
    if(!mid) return res.status(400).json({status:"failed",message:"Missing message id"})
    const deletedMessage=await messages.findByIdAndDelete(mid)
    if(!deletedMessage) return res.status(404).json({status:"failed",message:"No such message found"})
    res.status(200).json({status:"successful",message:deletedMessage})
  }catch(err){
    res.status(500).json({status:"failed",message:"Internal server error"})
    console.log(err)
  }
}

module.exports={createNewMessage,getMessage,getMessages,replyToMessage,deleteMessage}