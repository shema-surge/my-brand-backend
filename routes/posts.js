const {Router}=require("express")
const router=Router()
const {createNewPost, deletePost, editPost, getPost, getUserPosts,getAllPosts} = require("../controllers/posts");
const { authenticateUser,isAuthorized } = require("../middleware/auth");
const { likePost } = require("../controllers/likes");


router.get("/",authenticateUser,getUserPosts)
router.get("/getAllPosts",getAllPosts)
router.get('/likePost/:pid',authenticateUser,likePost)
router.get("/:pid",getPost)
router.post("/newPost",authenticateUser,createNewPost)
router.delete("/deletePost/:pid",authenticateUser,deletePost)
router.post("/editPost/:pid",authenticateUser,editPost)

module.exports=router

