import { getMovieAPI, getMoviesAPI, discoverMoviesAPI } from '..'
import { movies, movie } from '../../constants/jest-helpers'

const mockFetch = jest.fn((url) => {
  if (url.includes('movie/123')) {
    return Promise.resolve({
      json: () => Promise.resolve({ title: 'Movie Title', release_date: '2023-01-01' }),
    })
  }
  return Promise.reject(new Error('Network error'))
})

global.fetch = mockFetch

describe('getMovieAPI', () => {
  it('should fetch movie details successfully', async () => {
    const mockFetchResponse = {
      json: jest.fn().mockResolvedValue(movie),
    }

    jest.spyOn(global, 'fetch').mockResolvedValueOnce(mockFetchResponse)

    const result = await getMovieAPI('123')
    expect(result).toEqual(movie)
  })
})

describe('getMoviesAPI', () => {
  it('should fetch movies with query', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(movies),
    })

    const result = await getMoviesAPI({ page: 1, query: 'star wars' })
    expect(result).toEqual(movies)
  })

  it('should fetch movies without page', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(movies),
    })

    const result = await getMoviesAPI({})
    expect(result).toEqual(movies)
  })

  it('should fetch movies without query', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(movies),
    })

    const result = await getMoviesAPI({ page: 2 })
    expect(result).toEqual(movies)
  })
})

describe('discoverMoviesAPI', () => {
  it('should fetch popular movies', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(movies),
    })

    const result = await discoverMoviesAPI({ page: 1 })
    expect(result).toEqual(movies)
  })

  it('should fetch movies without page', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(movies),
    })

    const result = await discoverMoviesAPI({})
    expect(result).toEqual(movies)
  })
})