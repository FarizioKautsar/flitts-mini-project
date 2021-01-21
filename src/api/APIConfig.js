import axios from 'axios'

// General API Configuration for TMDB
export const APIConfig = axios.create(
    {
        baseURL: 'https://api.themoviedb.org/3',

        // Dev API key and watch region (Indonesia)
        params: {
            'api_key': '8ab3baef747bdd4688e56a6b71426bc6',
            'watch_region': 'ID',
        }
    }
)

// API for movie poster
export const ImageAPI = axios.create(
    {
        baseURL: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2',
    }
)