const {Router}=require("express")
const { login,signup } = require("../controllers/users")
const {authenticateUser}=require("../middleware/auth")
const {errHandler}=require("../middleware/errorHandler")
const {renderPost, renderBlogPosts}=require("../controllers/posts")
const { createNewMessage } = require("../controllers/messages")
const router=Router()

router.get("/", (req, res) => {
    res.render("index",{});
});
  
router.get("/login", (req, res) => {
    res.render("login",{});
});
  
router.get("/signup", (req, res) => {
    res.render("signup",{});
});
  
router.post('/login',login)
router.post("/signup", signup);
router.post("/newMessage",createNewMessage)
router.get('/post',authenticateUser,errHandler,renderPost)
router.get("/blog",authenticateUser,renderBlogPosts)

module.exports=router