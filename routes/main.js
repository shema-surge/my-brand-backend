const {Router}=require("express")
const { login,signup, logout } = require("../controllers/users")
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
  
router.post("/login",login)
router.post("/signup", signup);
router.get("/logout",logout)
router.post("/newMessage",createNewMessage)
router.get('/post',renderPost)
router.get("/blog",renderBlogPosts)

module.exports=router