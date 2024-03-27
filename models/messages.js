const {Schema,model, Types}=require('mongoose')

const messageSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    readBy:[Types.ObjectId],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=model('messages',messageSchema)