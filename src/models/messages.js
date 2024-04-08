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

module.exports=model('messages',messageSchema)