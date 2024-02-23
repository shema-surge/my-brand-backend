const dashNavigation=document.querySelector("#dashNavigation")

dashNavigation.addEventListener('change',()=>{
    switch(dashNavigation.value){
        case "Posts":
            window.location.href="./dashboard.html"
            break
        case "Messages":
            window.location.href="./dashmessages.html"
            break
        case "Users":
            window.location.href="./dashusers.html"
            break
        case "Notifications":
            window.location.href="./dashboard.html"
            break
        case "Account":
            window.location.href="./dashaccount.html"
            break
        default:
            console.log("Invalid Selection")
    }
})