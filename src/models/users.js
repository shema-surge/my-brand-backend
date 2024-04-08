const {Schema,model}=require("mongoose")

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    profileImg:{
        type:String,
        default: "https://res.cloudinary.com/upgeek/image/upload/v1711647508/o9venw9juzwmni9srzdi.png"
    },
    status:{
        type:String,
        enum:["inactive","active"],
        default:"inactive"
    }
},{timestamps:true})

module.exports=model('users',userSchema)