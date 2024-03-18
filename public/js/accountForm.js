const nameValidationErr=document.getElementById("nameValidationErr")
const nameInput=document.getElementById("nameInput")
const emailValidationErr=document.getElementById("emailValidationErr")
const emailInput=document.getElementById("emailInput")
const profileForm=document.querySelector("#profileForm")
const profileErrMessage=document.querySelector("#profileErrMessage")

const currentPasswdValidationErr=document.querySelector("#currentPasswdValidationErr")
const newPasswdValidationErr=document.querySelector("#newPasswdValidationErr")
const confirmNewPasswdValidationErr=document.querySelector("#confirmNewPasswdValidationErr")
const currentPasswdInput=document.querySelector("#currentPasswdInput")
const newPasswdInput=document.querySelector("#newPasswdInput")
const confirmNewPasswdInput=document.querySelector("#confirmNewPasswdInput")
const passwdForm=document.querySelector("#passwdForm")
const passwdErrMessage=document.querySelector("#passwdErrMessage")

nameInput.addEventListener('keypress',(e)=>{
    nameValidationErr.textContent=validateName(nameInput.value)
})

nameInput.addEventListener('keyup',(e)=>{
    nameValidationErr.textContent=validateName(nameInput.value)
})

emailInput.addEventListener('keypress',(e)=>{
    console.log(emailValidationErr)
    emailValidationErr.textContent=validateEmail(emailInput.value)
})

emailInput.addEventListener('keyup',(e)=>{
    emailValidationErr.textContent=validateEmail(emailInput.value)
})

currentPasswdInput.addEventListener("keyup",()=>{
    currentPasswdValidationErr.textContent=validateEmptyPasswd(currentPasswdInput.value)
})

currentPasswdInput.addEventListener("mouseleave",()=>{
    currentPasswdValidationErr.textContent=validateEmptyPasswd(currentPasswdInput.value)
})

newPasswdInput.addEventListener('keypress',(e)=>{
    newPasswdValidationErr.textContent=validatePasswd(newPasswdInput.value)
})

newPasswdInput.addEventListener('keyup',(e)=>{
    newPasswdValidationErr.textContent=validatePasswd(newPasswdInput.value)
})

confirmNewPasswdInput.addEventListener('keypress',(e)=>{
    confirmNewPasswdValidationErr.textContent=verifyPasswords(newPasswdInput.value,confirmNewPasswdInput.value)
})

confirmNewPasswdInput.addEventListener('keyup',(e)=>{
    confirmNewPasswdValidationErr.textContent=verifyPasswords(newPasswdInput.value,confirmNewPasswdInput.value)
})


profileForm.addEventListener("submit",(event)=>{
    if(validateName(nameInput.value) || validateEmail(emailInput.value)){
        event.preventDefault()
        profileErrMessage.style.display="block"
        profileErrMessage.innerHTML="<p>Please fill the form as instructed.</p>"
    }else{
        profileErrMessage.style.display="none"
    }
})

passwdForm.addEventListener("submit",(event)=>{
    if(validatePasswd(newPasswdInput.value) || validateEmptyPasswd(confirmNewPasswdInput.value) ||verifyPasswords(newPasswdInput.value,confirmNewPasswdInput.value)){
        event.preventDefault()
        passwdErrMessage.style.display="block"
        passwdErrMessage.innerHTML="<p>Please fill the form as instructed.</p>"
    }else{
        passwdErrMessage.style.display="none"
    }
})


