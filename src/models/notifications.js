const {Schema,model, Types}=require("mongoose")

const notificationsSchema=new Schema({
    user:{
        type:Types.ObjectId
    },
    content:{
        type:String,
        required:true
    },
    access:{
        type:String,
        enum:['private','admins','users'],
        default:'users'
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


notificationsSchema.pre('save',(next)=>{
    if(!this.user) this.access='private'
    next()
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