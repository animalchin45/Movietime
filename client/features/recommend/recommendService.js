import moviedb from "../../apis/moviedb"

const KEY = process.env.MOVIE_API_KEY

const recommendations = async (recommend) => {
  const response = await moviedb.get(
    `/${recommend.showType}/${recommend.id}/recommendations`,
    {
      params: {
        api_key: KEY,
        language: "en",
      },
    }
  )
  return response.data.results
}

const recommendService = {
  recommendations,
}

export default recommendService
