import axios from 'axios'

const API_URL = '/favorites/'

// Create New Favorite
const createFavorite = async (favoriteData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, favoriteData, config)

    return response.data
}

// Get user Favorites
const getFavorites = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete User Favorite
const deleteFavorite = async (favoriteId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + favoriteId, config)

    return response.data
}

const favoriteService = {
    createFavorite,
    getFavorites,
    deleteFavorite
}

export default favoriteService