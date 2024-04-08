const express = require("express");
const cors = require("cors")

const mainRouter = require("../src/routes/main")
const postsRouter = require("../src/routes/posts")
const commentRouter = require("../src/routes/comments")
const messageRouter = require("../src/routes/messages")
const userRouter = require("../src/routes/users")
const notificationRouter = require('../src/routes/notifications')
const keysRouter = require("../src/routes/keys")

const createServer = () => {
    const app = express();

    //middleware
    app.use(cors({ origin: '*' }))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //routes

    app.use("/", mainRouter)
    app.use("/posts", postsRouter)
    app.use('/comments/', commentRouter)
    app.use("/messages", messageRouter)
    app.use("/users", userRouter)
    app.use("/notifications", notificationRouter)
    app.use("/keys",keysRouter)

    return app
}

module.exports = createServer