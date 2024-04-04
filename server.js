const express = require("express");
const path = require("node:path");
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const cors=require("cors")

const app = express();

//middleware
app.use(cors({origin:'*'}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//routes
const mainRouter=require("./src/routes/main")
const postsRouter=require("./src/routes/posts")
const commentRouter=require("./src/routes/comments")
const messageRouter=require("./src/routes/messages")
const userRouter=require("./src/routes/users")
const notificationRouter=require('./src/routes/notifications')

app.use("/",mainRouter)
app.use("/posts",postsRouter)
app.use('/comments/',commentRouter)
app.use("/messages",messageRouter)
app.use("/users",userRouter)
app.use("/notifications",notificationRouter)

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to Mongo");
}).catch(err=>{
  console.log(err)
});

app.listen(process.env.PORT, () => {
  console.log(`Server live on port ${process.env.PORT}`);
});
