const {Router}=require("express")

const { isValidPasswdResetKey } = require("../controllers/keys")

const router=Router()

router.post('/passwd-reset-check/:code',isValidPasswdResetKey)

module.exports=router