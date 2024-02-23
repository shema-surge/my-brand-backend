const emailValidationErr=document.getElementById("emailValidationErr")
const emailInput=document.getElementById("emailInput")
const passwdInput=document.getElementById("passwdInput")
const passwdValidationErr=document.getElementById("passwdValidationErr")
const form=document.querySelector(".form")
const errMessage=document.querySelector(".errMessage")

emailInput.addEventListener('keypress',()=>{
    emailValidationErr.textContent=validateEmail(emailInput.value)
})

emailInput.addEventListener('keyup',()=>{
    emailValidationErr.textContent=validateEmail(emailInput.value)
})

passwdInput.addEventListener("keyup",()=>{
    passwdValidationErr.textContent=validateEmptyPasswd(passwdInput.value)
})

passwdInput.addEventListener("mouseleave",()=>{
    passwdValidationErr.textContent=validateEmptyPasswd(passwdInput.value)
})

form.addEventListener("submit",(event)=>{
    if(validateEmail(emailInput.value) || !passwdInput.value){
        event.preventDefault()
        errMessage.style.display="block"
        errMessage.innerHTML="<p>Please fill the form as instructed.</p>"
    }else{
        errMessage.style.display="none"
    }
})


