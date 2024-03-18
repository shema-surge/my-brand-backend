const errHandler=(err,req,res,next)=>{
    console.log(req)
    if(!req.loggedIn) res.redirect("/login")
}

module.exports={errHandler}