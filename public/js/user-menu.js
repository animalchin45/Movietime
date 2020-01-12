// Desktop
const editFavMovie = document.getElementById('editFavMovie')
const favMovie = document.getElementById('favMovie')
const editFavGenre = document.getElementById('editFavGenre')
const favGenre = document.getElementById('favGenre')

const hamburger = document.getElementById('hamburger')
const profile = document.getElementById('profile')


editFavMovie.addEventListener('click', () => {
    if(favMovie.style.opacity === '0') {
        favMovie.style.opacity = '1'
    } else {
        favMovie.style.opacity = '0'
    }
})

editFavGenre.addEventListener('click', () => {
    if(favGenre.style.opacity === '0') {
        favGenre.style.opacity = '1'
    } else {
        favGenre.style.opacity = '0'
    }
})

window.addEventListener('load', () => {
    const w = this.document.documentElement.clientWidth
    if(w >= 1200){
        hamburger.style.display = 'none'
        hamburger.className = 'hamburger hamburger--arrow'
        profile.style.opacity = '1'
        profile.style.left = 'auto'
        profile.style.transform = 'none'
    } else {
        hamburger.style.display = 'inline-block'
    }
})

window.addEventListener('resize', () => {
    const w = this.document.documentElement.clientWidth

    if(w >= 1200){
        hamburger.style.display = 'none'
        hamburger.className = 'hamburger hamburger--arrow'
        profile.style.opacity = '1'
        profile.style.left = 'auto'
        profile.style.transform = 'none'
    } else {
        hamburger.style.display = 'inline-block'
        hamburger.className = 'hamburger hamburger--arrow'
        profile.style.opacity = '0'
        profile.style.left = '-1200px'
    }
})

hamburger.addEventListener('click', (e) => {
    if(hamburger.className === 'hamburger hamburger--arrow') {
        hamburger.className += ' is-active'
        profile.style.opacity = '1'
        profile.style.left = '50%'
        profile.style.transform = 'translateX(-50%)'
    } else {
        hamburger.className = 'hamburger hamburger--arrow'
        profile.style.opacity = '0'
        profile.style.left = '-1200px'
    }
})