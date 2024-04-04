const {Schema,model, Types}=require('mongoose')
const notifications = require('./notifications')

const messageSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    read:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const messagesModel=model('messages',messageSchema)

messageSchema.post('findOne',async(doc,next)=>{
    try{
        messagesModel.findByIdAndUpdate(doc._id,{read:true})
        next()
    }catch(err){
        next(err)
    }
})

messageSchema.post('save',async(doc,next)=>{
    try{
        await notifications.create({access:'admins',content:`New message from email: ${doc.email},subject: ${doc.subject}`})
        next()
    }catch(err){
        next(err)
    }
})

module.exports=messagesModel