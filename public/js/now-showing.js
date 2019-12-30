const editFavMovie = document.getElementById('editFavMovie')
const favMovie = document.getElementById('favMovie')
const editFavGenre = document.getElementById('editFavGenre')
const favGenre = document.getElementById('favGenre')


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