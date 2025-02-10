import { API_TOKEN, API_URL } from "../config"

export const getMovieAPI = async (movie_id) => {
  const URL = `${API_URL}/movie/${movie_id}?api_key=${API_TOKEN}&append_to_response=videos`
  const data = await fetch(URL).then((response) => response.json())
  return data
}

export const getMoviesAPI = async ({ page = 1, query = '' }) => {
  let URL = `${API_URL}/search/movie?api_key=${API_TOKEN}&page=${page}`
  if (query) URL += '&query=' + query
  const data = await fetch(URL).then((response) => response.json())
  return data
}

export const discoverMoviesAPI = async ({ page = 1 }) => {
  let URL = `${API_URL}/discover/movie?api_key=${API_TOKEN}&sort_by=vote_count.desc&page=${page}`
  const data = await fetch(URL).then((response) => response.json())
  return data
}