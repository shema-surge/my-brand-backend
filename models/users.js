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
        default: "User-Profile-PNG-Image 1.png"
    },
    status:{
        type:String,
        enum:["frozen","active"],
        default:"active"
    }
},{timestamps:true})

module.exports=model('users',userSchema)