const {Router}=require("express")

const {createNewComment, deleteComment, editComment, getPostComments}=require("../controllers/comments");
const { likeComment } = require("../controllers/likes");
const { authenticateUser } = require("../middleware/auth");

const router=Router()

router.get('/:pid',getPostComments)
router.post("/newComment/:pid",authenticateUser,createNewComment);
router.get("/likeComment/:cid",authenticateUser,likeComment)
router.put('/editComment/:cid',authenticateUser,editComment)
router.delete("/deleteComment/:cid",authenticateUser,deleteComment)

module.exports=router