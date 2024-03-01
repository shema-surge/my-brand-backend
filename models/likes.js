const {Schema,Types,model}=require("mongoose")

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