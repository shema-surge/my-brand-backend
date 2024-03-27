const express = require("express");
const path = require("node:path");
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//routes
const mainRouter=require("./routes/main")
const postsRouter=require("./routes/posts")
const commentRouter=require("./routes/comments")
const messageRouter=require("./routes/messages")
const userRouter=require("./routes/users")

app.use("/",mainRouter)
app.use("/posts",postsRouter)
app.use('/comments/',commentRouter)
app.use("/messages",messageRouter)
app.use("/users",userRouter)

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to Mongo");
}).catch(err=>{
  console.log(err)
});

app.listen(process.env.PORT, () => {
  console.log(`Server live on port ${process.env.PORT}`);
});
