const messages=require("../models/messages")

const renderDashboardMessages= async(req,res)=>{
    try{
      const allMessages=await messages.find()
      res.render('dashmessages',{user:req.user,messages:allMessages})
    }catch(err){
      console.log(err)
    }
}

const createNewMessage= async (req, res) => {
    try {
      const { name,email,message } = req.body;
      if (!name || !email || !message) throw new Error("Missing data fields");
      await messages.create({ name, email,message });
    } catch (err) {
      console.log(err);
    }
}

module.exports={renderDashboardMessages,createNewMessage}