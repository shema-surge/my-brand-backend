const {Schema,Types,model}=require("mongoose")
const notifications = require("./notifications")
const users = require("./users")
const posts = require("./posts")
const comments=require("./comments")

const likeSchema=new Schema({
    recipient:{
        type:Types.ObjectId,
        required:true
    },
    user:{
        type:Types.ObjectId,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})


module.exports=model('likes',likeSchema)