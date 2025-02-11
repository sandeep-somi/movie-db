import React from 'react'
import StarredMovies from '../starred-movies'
import { render } from '@testing-library/react'
// eslint-disable-next-line jest/no-mocks-import
import wrapper from '../../__mocks__/provider-wrapper'
// eslint-disable-next-line jest/no-mocks-import
import { movies } from '../../constants/jest-helpers'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(() => movies)
}))

describe('<StarredMovies />', () => {
  it('should render', () => {
    const { container } = render(<StarredMovies />, { wrapper })
    expect(container).toBeDefined()
  })

  it.skip('should filter starred movies', async () => {
    render(<StarredMovies />, { wrapper })
  })
})