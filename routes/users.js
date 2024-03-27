const {Router}=require("express")
const multer=require("multer")
const router=Router()
const {getUsers, activateUser,editUserInfo} = require("../controllers/users")
const { authenticateUser } = require("../middleware/auth")

const storage=multer.diskStorage({dest:"/tmp"})
const upload=multer({storage:storage})

router.get('/',authenticateUser,getUsers)
router.get('/activate/:key',activateUser)
router.post('/edit',upload.single('profileImg'),editUserInfo)

module.exports=router