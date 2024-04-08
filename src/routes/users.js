const {Router}=require("express")
const multer=require("multer")
const router=Router()
const {getUsers, activateUser,editUserInfo, getUser, getCurrentUser, resendActivationCode, changeUserPassword, resetPassword, sendPassworResetKey, changeUserRole, deleteUser} = require("../controllers/users")
const { authenticateUser, isAuthorized, isActive } = require("../middleware/auth")

const storage=multer.diskStorage({dest:"/tmp"})
const upload=multer({storage:storage})

router.get('/',authenticateUser,isActive,isAuthorized,getUsers)
router.put('/activate',activateUser)
router.get('/current',authenticateUser,isActive,getCurrentUser)
router.get('/user/:uid',authenticateUser,isActive,getUser)
router.post('/resendActivation',authenticateUser,resendActivationCode)
router.post('/edit',authenticateUser,isActive,upload.single('profileImg'),editUserInfo)
router.post('/changePassword',authenticateUser,isActive,changeUserPassword)
router.post('/resetPassword/:code',resetPassword)
router.post('/sendPasswdReset',sendPassworResetKey)
router.put('/:uid/role',authenticateUser,isActive,isAuthorized,changeUserRole)
router.delete('/:uid',authenticateUser,isActive,isAuthorized,deleteUser)

module.exports=router