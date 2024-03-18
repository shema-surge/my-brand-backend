const {Router}=require("express")
const router=Router()
const { renderUsers, getUsers } = require("../controllers/users")

router.get('/',renderUsers)
router.get('/getUsers',getUsers)

module.exports=router