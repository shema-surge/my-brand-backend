const navItems = document.querySelectorAll('.nav-item')
const menu = document.querySelector(".menu")
const header = document.querySelector('header')
const mobileHeader = document.querySelector('.mobileHeader')
const closeBtn = document.querySelector('.backBtn')
const navigation = document.querySelector(".navigation")
const loginBtn = document.querySelector("#loginBtn")
const wideScreenProfile = document.querySelector("#wide-screen-profile")
const profileOptions = document.querySelector(".profileOptions")
const mobileScreenProfile = document.querySelector("#mobile-screen-profile")
const mobileProfileOptions = document.querySelector(".mobileProfileOptions")

navItems.forEach(navItem => {
    navItem.addEventListener('mouseenter', () => {
        navItem.children[0].style.width = '100%';
    })
    navItem.addEventListener('mouseleave', () => {
        navItem.children[0].style.width = '10px';
    })

    navItem.addEventListener('click', () => {
        mobileHeader.style.display = "none"
    })
})

window.addEventListener('resize', () => {
    if (window.innerWidth >= 700) {
        if(mobileHeader) mobileHeader.style.display = "none"
        header.style.display = "flex"
    } else {
        if(profileOptions) profileOptions.style.display = "none"
    }
})

if (wideScreenProfile && profileOptions) {
    document.addEventListener('click', (event) => {
        if (!wideScreenProfile.contains(event.target)) {
            profileOptions.style.display = "none"
        }
    })
}


menu.addEventListener('click', () => {
    mobileHeader.style.display = "flex"
    header.style.display = "none"
})

closeBtn.addEventListener('click', () => {
    mobileHeader.style.display = "none"
    header.style.display = "flex"
})

if (wideScreenProfile && profileOptions) {
    wideScreenProfile.addEventListener('click', () => {
        if (profileOptions.style.display === "flex") {
            profileOptions.style.display = "none"
            return
        }
        profileOptions.style.display = "flex"
    })
}

if (mobileScreenProfile && mobileProfileOptions) {
    mobileScreenProfile.addEventListener('click', () => {
        if (mobileProfileOptions.style.display === "flex") {
            mobileProfileOptions.style.display = "none"
            return
        }
        mobileProfileOptions.style.display = "flex"
    })
}



