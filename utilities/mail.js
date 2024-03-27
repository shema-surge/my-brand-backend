const nodemailer =require("nodemailer")

const transporter=nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure:false,
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
    }
})

const sendMail=async(recipient,subject,htmlContent)=>{
    try{
        const result=await transporter.sendMail({
            from:process.env.SMTP_USER,
            to:recipient,
            subject:subject,
            html:htmlContent
        })
        return result
    }catch(err){
        console.log(err)
    }
}


module.exports={sendMail}