const posts=require("../models/posts")
const messages=require("../models/messages")
const users=require("./models/users")

const getStats=async()=>{
    const postCount=await posts.estimatedDocumentCount()
    const messageCount=await messages.estimatedCount()
    const userCunt=await users.estimatedCount()
    return {postCount,messageCount,userCount}
}

module.exports=getStats