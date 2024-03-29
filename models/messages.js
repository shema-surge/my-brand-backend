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

messageSchema.post('findOne',async(doc,next)=>{
    try{
        doc.read=true
        await doc.save()
        next()
    }catch(err){
        console.log(err)
    }
})

messageSchema.post('save',async(doc,next)=>{
    try{
        await notifications.create({content:`New message from email: ${doc.email},subject: ${doc.subject}`})
        next()
    }catch(err){
        console.log(err)
    }
})

module.exports=model('messages',messageSchema)