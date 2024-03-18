const ellipsisBtn=document.querySelectorAll(".moreOptionsBtn")
let currentActive=null



ellipsisBtn.forEach(btn=>{
    btn.addEventListener('click',(event)=>{
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