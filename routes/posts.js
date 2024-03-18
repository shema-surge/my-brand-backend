const {Router}=require("express")
const router=Router()
const { renderNewPost, renderPosts, likePost,createNewPost, deletePost, editPost, renderEditPost, getPost, getPosts} = require("../controllers/posts");
const {createNewComment, likeComment}=require("../controllers/comments");
const { authenticateUser,isAuthorized } = require("../middleware/auth");

router.use(authenticateUser)

router.get("/",renderPosts);
router.get('/likePost',likePost)
router.get("/newPost",renderNewPost);
router.get("/editPost",renderEditPost)
router.get("/getPost",getPost)
router.get("/getPosts",getPosts)
router.post("/newComment",createNewComment);
router.post("/newPost",createNewPost)
router.post("/likeComment",likeComment)
router.delete("/deletePost",deletePost)
router.post("/editPost",editPost)

module.exports=router

