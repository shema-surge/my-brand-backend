const {Schema,model, Types}=require("mongoose")

const notificationsSchema=new Schema({
    content:{
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

notificationsSchema.post('findOne',async(doc,next)=>{
    try{
        doc.read=true
        await doc.save()
        next()
    }catch(err){
        console.log(err)
    }
})

module.exports=model("notifications",notificationsSchema)