import moviedb from '../../apis/moviedb'

const KEY = process.env.MOVIE_API_KEY

const images = async () => {
    const response = await Promise.all([
        moviedb.get()
    ])
}

const actorService = {
    images
}

export default actorService