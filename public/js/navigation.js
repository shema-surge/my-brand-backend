const dashNavigation=document.querySelector("#dashNavigation")

dashNavigation.addEventListener('change',()=>{
    switch(dashNavigation.value){
        case "Posts":
            window.location.href="/posts"
            break
        case "Messages":
            window.location.href="/messages"
            break
        case "Users":
            window.location.href="/users"
            break
        case "Notifications":
            window.location.href="/notifications"
            break
        case "Account":
            window.location.href="/account"
            break
        default:
            console.log("Invalid Selection")
    }
})