import moviedb from '../../apis/moviedb'

const KEY = process.env.MOVIE_API_KEY

const peopleDetails = async (personId) => {
  const response = await moviedb.get(`/person/${personId}`, {
    params: {
      api_key: KEY,
      language: 'en',
    },
  })

  return response.data
}

// todo - need to figure out proper way to retrieve
const peopleShows = async (personId) => {
  const response = await moviedb.get(`/person/${personId}/combined_credits`, {
    params: {
      api_key: KEY,
      language: 'en',
    },
  })

  // console.log(response.data.cast)

  const { cast } = response.data

  const allPop = cast.map((pop) => pop.popularity)

  // console.log(allPop)

  const average = allPop.reduce((a, b) => a + b, 0) / cast.length

  const knownFor = cast.filter((title) => {
    return title.popularity > average
  })

  // console.log(knownFor)

  return knownFor.slice(0, 8)
}

const peopleImages = async (personId) => {
  const response = await moviedb.get(`/person/${personId}/images`, {
    params: {
      api_key: KEY,
    },
  })

  return response.data.profiles
}

const peopleService = {
  peopleDetails,
  peopleImages,
  peopleShows,
}

export default peopleService
