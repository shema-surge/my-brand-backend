const moreOptionsBtn=document.querySelectorAll(".moreOptionsBtn")
const options=document.querySelectorAll(".options")
let currentActive=null



moreOptionsBtn.forEach(btn=>{
    btn.addEventListener('click',(event)=>{
        console.log("ellipsis clicked")
        let optionMenu=btn.nextElementSibling
        if(optionMenu.style.display==="flex"){
            currentActive=null
            optionMenu.style.display="none"
            return
        }
        if(currentActive) currentActive.style.display="none"
        optionMenu.style.display="flex"
        currentActive=optionMenu
    })
})

document.addEventListener('click',(event)=>{
    if(currentActive && currentActive.previousElementSibling!=event.target){
        currentActive.style.display="none"
    }
})