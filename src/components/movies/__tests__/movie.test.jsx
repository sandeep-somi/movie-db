import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Movie from '../movie'
// eslint-disable-next-line jest/no-mocks-import
import { mockMovie } from '../../../__mocks__/movies.mock'
// eslint-disable-next-line jest/no-mocks-import
import wrapper from '../../../__mocks__/provider-wrapper'

describe('Movies', () => {
  const mockViewTrailer = jest.fn()
  it('should render', () => {
    const { container } = render(<Movie movie={mockMovie} viewTrailer={mockViewTrailer} />, { wrapper })
    expect(container).toBeInTheDocument();
  })

  it('should add to watch list', async () => {
    render(<Movie movie={mockMovie} viewTrailer={mockViewTrailer} />, { wrapper })
    const watchLater = screen.getByTestId('watch-later');
    fireEvent.click(watchLater);
    await waitFor(() => {
      const removeWatchLater = screen.getByTestId('remove-watch-later');
      expect(removeWatchLater).toBeInTheDocument();
    })
  })

  it('should remove from watch list', async () => {
    render(<Movie movie={mockMovie} viewTrailer={mockViewTrailer} />, { wrapper })
    const removeWatchLater = screen.getByTestId('remove-watch-later');
    fireEvent.click(removeWatchLater);
    await waitFor(() => {
      const watchLater = screen.getByTestId('watch-later');
      expect(watchLater).toBeInTheDocument();
    })
  })
  it('should add to starred list', async () => {
    render(<Movie movie={mockMovie} viewTrailer={mockViewTrailer} />, { wrapper })
    const star = screen.getByTestId('starred-link');
    fireEvent.click(star);
    await waitFor(() => {
      const unstar = screen.getByTestId('unstar-link');
      expect(unstar).toBeInTheDocument();
    })
  })

  it('should remove from starred list', async () => {
    render(<Movie movie={mockMovie} viewTrailer={mockViewTrailer} />, { wrapper })
    const unstar = screen.getByTestId('unstar-link');
    fireEvent.click(unstar);
    await waitFor(() => {
      const star = screen.getByTestId('starred-link');
      expect(star).toBeInTheDocument();
    })
  })

  it('should call the view trailer function', async () => {
    render(<Movie movie={mockMovie} viewTrailer={mockViewTrailer} />, { wrapper })
    const viewTrailer = screen.getByTestId('view-trailer');
    fireEvent.click(viewTrailer);
    expect(mockViewTrailer).toHaveBeenCalled();
  })

  it('should load placeholder image if the poster path is not available', async () => {
    render(<Movie movie={{ ...mockMovie, poster_path: null }} viewTrailer={mockViewTrailer} />, { wrapper })
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/images/not-found-500X750.jpeg');
  })
})
