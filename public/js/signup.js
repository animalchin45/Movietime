// const username = document.getElementById('userName')
const password = document.getElementById('password')
const passwordError = document.getElementById('passwordError')
const verifyPassword = document.getElementById('verifyPassword')
const verifyError = document.getElementById('verifyError')
// const email = document.getElementById('email')

// Password not long enough
password.addEventListener('input', () => {
    if (password.value.length < 7) {
        passwordError.style.opacity = 1
    } else {
        passwordError.style.opacity = 0
    }
})

// Password does not match
verifyPassword.addEventListener('input', () => {
    if (verifyPassword.value !== password.value) {
        verifyError.style.opacity = 1
    } else {
        verifyError.style.opacity = 0
    }
})