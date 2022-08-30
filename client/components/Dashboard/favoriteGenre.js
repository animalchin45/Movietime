export const favoriteGenre = (favorites) => {
  if (favorites.length == 0) {
    return null
  }

  // Make list of all genres from user favorites
  const genres = favorites.map((fav) => fav.genres.map((genre) => genre))
  const mergedGenres = [].concat.apply([], genres)
  const favGenres = mergedGenres.map((fav) => fav.name)

  var modeMap = {}
  var maxEl = favGenres[0],
    maxCount = 1

  for (var i = 0; i < favGenres.length; i++) {
    var el = favGenres[i]

    if (modeMap[el] == null) {
      modeMap[el] = 1
    } else {
      modeMap[el]++
    }

    if (modeMap[el] > maxCount) {
      maxEl = el
      maxCount = modeMap[el]
    }
  }
  return maxEl
}
