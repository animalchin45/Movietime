const watched = document.querySelector('#watched')

watched.addEventListener('click', () => {
    if (watched.textContent === 'watched') {
        watched.value = true
    }
})