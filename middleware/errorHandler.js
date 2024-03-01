const errHandler=(err,req,res,next)=>{
    if(err.message="TokenExpiredError") res.redirect('/login')
    else{
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports={errHandler}