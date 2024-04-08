const {Router}=require("express")
const router=Router()
const {createNewPost, deletePost, editPost, getPost, getUserPosts,getAllPosts, searchAllPosts, searchUserPosts} = require("../controllers/posts");
const { authenticateUser,isActive } = require("../middleware/auth");
const { likePost } = require("../controllers/likes");
const { activateUser } = require("../controllers/users");


router.get("/",authenticateUser,isActive,getUserPosts)
router.get("/getAllPosts",getAllPosts)
router.get('/likePost/:pid',authenticateUser,isActive,likePost)
router.get("/post/:pid",getPost)
router.post("/searchAllPosts",searchAllPosts)
router.post("/searchUserPosts",authenticateUser,isActive,searchUserPosts)
router.post("/newPost",authenticateUser,isActive,createNewPost)
router.delete("/deletePost/:pid",authenticateUser,isActive,deletePost)
router.post("/editPost/:pid",authenticateUser,isActive,editPost)
router.post("/activate/:code",authenticateUser,isActive,activateUser)

module.exports=router

