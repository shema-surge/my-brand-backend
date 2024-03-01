const {Router}=require("express")
const router=Router()
const {authenticateUser}=require("../middleware/auth")
const {errHandler}=require("../middleware/errorHandler");
const { renderNewPost, renderDashboardPosts, likePost,createNewPost, deletePost, editPost, renderEditPost} = require("../controllers/posts");
const {createNewComment, likeComment}=require("../controllers/comments")

router.get("/",authenticateUser,errHandler,renderDashboardPosts);
router.get('/likePost',authenticateUser,errHandler,likePost)
router.get("/newPost",authenticateUser,errHandler,renderNewPost);
router.get("/editPost",authenticateUser,errHandler,renderEditPost)
router.post("/newComment",authenticateUser,errHandler,createNewComment);
router.post("/newPost",authenticateUser,errHandler,createNewPost)
router.post("/likeComment",authenticateUser,errHandler,likeComment)
router.post("/deletePost",authenticateUser,errHandler,deletePost)
router.post("/editPost",authenticateUser,errHandler,editPost)

module.exports=router

