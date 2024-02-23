const nameValidationErr=document.getElementById("nameValidationErr")
const nameInput=document.getElementById("nameInput")
const emailValidationErr=document.getElementById("emailValidationErr")
const emailInput=document.getElementById("emailInput")
const messageValidationErr=document.getElementById("messageValidationErr")
const messageInput=document.getElementById("messageInput")
const form=document.querySelector(".form")
const errMessage=document.querySelector(".errMessage")

nameInput.addEventListener('keypress',(e)=>{
    nameValidationErr.textContent=validateName(nameInput.value)
})

nameInput.addEventListener('keyup',(e)=>{
    nameValidationErr.textContent=validateName(nameInput.value)
})

emailInput.addEventListener('keypress',(e)=>{
    emailValidationErr.textContent=validateEmail(emailInput.value)
})

emailInput.addEventListener('keyup',(e)=>{
    emailValidationErr.textContent=validateEmail(emailInput.value)
})

messageInput.addEventListener('keypress',(e)=>{
    messageValidationErr.textContent=validateMessage(messageInput.value)
})

messageInput.addEventListener('keyup',(e)=>{
    messageValidationErr.textContent=validateMessage(messageInput.value)
})

form.addEventListener("submit",(event)=>{
    if(validateEmail(emailInput.value) || validateName(nameInput.value) || validateMessage(messageInput.value)){
        event.preventDefault()
        errMessage.style.display="block"
        errMessage.innerHTML="<p>Please fill the form as instructed.</p>"
    }else{
        errMessage.style.display="none"
    }
})
