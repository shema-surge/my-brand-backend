const {Schema,model, Types}=require("mongoose")

const notificationsSchema=new Schema({
    user:{
        type:Types.ObjectId,
        default:null
    },
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=model("notifications",notificationsSchema)