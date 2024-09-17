import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Movies from '../movies'
// eslint-disable-next-line jest/no-mocks-import
import { mockMovies, mockMovie } from '../../../constants/jest-helpers'
// eslint-disable-next-line jest/no-mocks-import
import wrapper from '../../../__mocks__/provider-wrapper'
import userEvent from '@testing-library/user-event'

jest.mock('../../../apis', () => ({
  ...jest.requireActual('../../../apis'),
  getMovieAPI: jest.fn((id) => Promise.resolve({ videos: { results: [{ type: 'Trailer', key: '123' }] } })),
}));

const mockPortal = jest.fn()

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: jest.fn((element, container) => mockPortal(element, container))
}))

describe('Movies', () => {
  it('should render', () => {
    const { container } = render(<Movies movies={mockMovies.results} />, { wrapper })
    expect(container).toBeDefined()
  })

  it('should open movie trailer', async () => {
    render(<Movies movies={[mockMovie]} />, { wrapper })
    const viewTrailer = screen.getByTestId('view-trailer')
    userEvent.click(viewTrailer)
    await waitFor(() => {
      expect(mockPortal).toHaveBeenCalled()
    })
  })
})
