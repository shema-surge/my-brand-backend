const {Router}=require("express")
const router=Router()
const { renderAccount, editUserInfo } = require("../controllers/users")

router.get('/',renderAccount)
router.post('/editUserInfo',editUserInfo)

module.exports=router