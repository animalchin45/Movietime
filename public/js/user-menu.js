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
        hamburger.className = 'hamburger hamburger--arrow'
        profile.style.opacity = '1'
        profile.style.left = 'auto'
    } else {
        hamburger.style.opacity = '1'
    }
})

window.addEventListener('resize', () => {
    const w = this.document.documentElement.clientWidth

    if(w >= 1200){
        hamburger.style.opacity = '0'
        hamburger.className = 'hamburger hamburger--arrow'
        profile.style.opacity = '1'
        profile.style.left = 'auto'
    } else if(w <= 1200 &&  hamburger.className === 'hamburger hamburger--arrow') {
        profile.style.left = '-1200px'
        hamburger.style.opacity = '1'
    } else {
        hamburger.style.opacity = '1'
    }
})

hamburger.addEventListener('click', (e) => {
    if(hamburger.className === 'hamburger hamburger--arrow') {
        hamburger.className += ' is-active'
        profile.style.opacity = '1'
        profile.style.left = '0'
    } else {
        hamburger.className = 'hamburger hamburger--arrow'
        profile.style.opacity = '0'
        profile.style.left = '-1200px'
    }
})