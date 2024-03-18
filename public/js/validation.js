const validateName=(fullname)=>{
    const nameRegex=/^[a-zA-Z-' ]{2,}$/
    if(!fullname) return 'Name field cannot be empty!'
    if(!fullname.match(nameRegex)) return 'Please enter a valid fullname'
    return ''
}

const validateEmail=(email)=>{
    const emailRegex=/^[a-z][a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/
    if(!email) return 'Email field cannot be empty!'
    if(!email.match(emailRegex)) return 'Please enter a valid email'
    return ''
}

const validateEmptyPasswd=(passwdStr)=>{
    if(!passwdStr) return "Password field can't be empty"
    else return ''
}

const validatePasswd=(passwd)=>{
    const passwdRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,30}$/
    if(!passwd) return 'Password field cannot be empty!'
    if(!passwd.match(passwdRegex)) return 'Please enter a valid password'
    return ''
}

const verifyPasswords=(passwd,verifyPasswd)=>{
    if(passwd!==verifyPasswd) return 'Passwords do not match'
    return ''
}

const validateMessage=(messageStr)=>{
    const messageRegex=/^[A-Za-z0-9\s\d!@#$%^&*]{2,}$/
    if(!messageStr) return 'Message field cannot be empty!'
    if(!messageStr.match(messageRegex)) return 'Please enter a valid message'
    return ''
}
