const {Schema,model, Types}=require("mongoose")

const notificationsSchema=new Schema({
    content:{
        type:String,
        required:true
    },
    readBy:[Types.ObjectId],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=model("notifications",notificationsSchema)